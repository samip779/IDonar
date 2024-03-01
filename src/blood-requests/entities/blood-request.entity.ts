import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BloodGroup, Gender } from '../../common/enums';
import { User } from '../../users/entities/user.entity';
import { BloodRequestStatus } from '../enums';
import { AcceptedBloodRequest } from './accepted-blood-request.entity';

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

  // @Column({ name: 'donation_date' })
  // donationDate: Date;

  @Column({ name: 'priority', default: 1, type: 'int2' })
  priority: number;

  @Column({ name: 'contact_number', nullable: true })
  contactNumber: string;

  @Column({ name: 'address' })
  address: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: BloodRequestStatus,
    default: BloodRequestStatus.PENDING,
  })
  status: BloodRequestStatus;

  @Column({ name: 'latitude', type: 'double precision', nullable: true })
  latitude: number;

  @Column({ name: 'longitude', type: 'double precision', nullable: true })
  longitude: number;

  // relations
  @Column({ name: 'requester_id', type: 'uuid' })
  requesterId: string;

  @ManyToOne(() => User, (user) => user.bloodRequests)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @OneToMany(
    () => AcceptedBloodRequest,
    (acceptedBloodRequest) => acceptedBloodRequest.bloodRequest,
  )
  acceptedBloodRequests: AcceptedBloodRequest[];

  // automatic
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
