import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { OTPType } from '../enums';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'otp' })
export class OTP {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @Column({ name: 'code', type: 'varchar', length: 6 })
  code: string;

  @Column({ name: 'type', type: 'enum', enum: OTPType })
  type: OTPType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.otps, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
