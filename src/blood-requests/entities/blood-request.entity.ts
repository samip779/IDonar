import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BloodGroup, Gender } from '../../common/enums';

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

  @Column({ name: 'address' })
  address: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
