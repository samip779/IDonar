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
import { AcceptBloodRequestStatus } from '../enums';

@Entity({ name: 'accepted_blood_requests' })
export class AcceptedBloodRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'donor_fullname', type: 'varchar' })
  donorFullName: string;

  @Column({ name: 'patient_gender', type: 'enum', enum: Gender })
  donorGender: Gender;

  @Column({ name: 'patient_age', type: 'int4' })
  donorAge: number;

  @Column({ name: 'donor_height', type: 'int4' })
  donorHeight: number;

  @Column({ name: 'donor_weight', type: 'int4' })
  donorWeight: number;

  @Column({ name: 'donor_address', type: 'varchar' })
  donorAddress: string;

  @Column({ name: 'donor-diseases', type: 'varchar', nullable: true })
  donorDiseases?: string;

  @Column({ name: 'blood_group', type: 'enum', enum: BloodGroup })
  donorBloodGroup: BloodGroup;

  @Column({ name: 'donor_contact_number', type: 'varchar' })
  donorContactNumber: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: AcceptBloodRequestStatus,
    default: AcceptBloodRequestStatus.SUBMITTED_BY_DONOR,
  })
  status: AcceptBloodRequestStatus;

  @Column({ name: 'is_donor_user', type: 'bool' })
  isDonorUser: boolean;

  // relations
  @Column({ name: 'requester_id', type: 'uuid' })
  requesterId: string;

  @ManyToOne(() => User, (user) => user.bloodRequests)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @Column({ name: 'accepted_account_id', type: 'uuid' })
  acceptedAccountId: string;

  @ManyToOne(() => User, (user) => user.acceptedBloodRequests)
  @JoinColumn({ name: 'accepted_account_id' })
  acceptedAccount: User;

  // automatic
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
