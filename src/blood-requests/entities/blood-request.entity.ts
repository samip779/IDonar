import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BloodGroup, Gender } from '../../common/enums';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'blood_requests' })
export class BloodRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'patient_gender', type: 'enum', enum: Gender })
  patientGender: Gender;

  @Column({ name: 'patient_age', type: 'int4' })
  patientAge: number;

  @Column({ name: 'blood_group', type: 'enum', enum: BloodGroup })
  bloodGroup: BloodGroup;

  @Column({ name: 'donation_date' })
  donationDate: Date;

  @Column({ name: 'contact_number', nullable: true })
  contactNumber: string;

  @Column({ name: 'address' })
  address: string;

  // relations

  @Column({ name: 'requester_id', type: 'uuid' })
  requesterId: string;

  @ManyToOne(() => User, (user) => user.bloodRequests)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  // automatic

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
