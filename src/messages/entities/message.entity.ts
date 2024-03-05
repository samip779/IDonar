import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'sender_id', type: 'uuid' })
  senderId: string;

  @Column({ name: 'receiver_id', type: 'uuid' })
  receiverId: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @JoinColumn({ name: 'sender_id' })
  @ManyToOne(() => User, (user) => user.sentMessages)
  sender: string;

  @JoinColumn({ name: 'receiver_id' })
  @ManyToOne(() => User, (user) => user.receivedMessages)
  receiver: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
