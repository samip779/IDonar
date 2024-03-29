import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OTP } from '../../otp/entities/otp.entity';
import { BloodGroup, Gender } from '../../common/enums';
import { BloodRequest } from '../../blood-requests/entities/blood-request.entity';
import { AcceptedBloodRequest } from '../../blood-requests/entities/accepted-blood-request.entity';
import { Notification } from '../../notification/entities/notification.entity';
import { Message } from '../../messages/entities/message.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'firstname' })
  firstname: string;

  @Column({ name: 'lastname' })
  lastname: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'gender', type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ name: 'height' })
  height: number;

  @Column({ name: 'weight' })
  weight: number;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'province' })
  province: string;

  @Column({ name: 'street' })
  street: string;

  @Column({
    name: 'blood_group',
    type: 'enum',
    enum: BloodGroup,
    nullable: true,
  })
  bloodGroup?: BloodGroup;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => OTP, (otp) => otp.user, { cascade: true })
  otps: OTP[];

  @OneToMany(() => BloodRequest, (bloodRequest) => bloodRequest.requester)
  bloodRequests: BloodRequest[];

  @OneToMany(
    () => AcceptedBloodRequest,
    (acceptedBloodRequest) => acceptedBloodRequest.acceptedAccount,
  )
  acceptedBloodRequests: AcceptedBloodRequest[];

  @OneToMany(() => Notification, (notification) => notification.notifier)
  notifications: Notification[];

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];
}
