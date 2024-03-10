import { ApiProperty } from '@nestjs/swagger';
import { BloodGroup, Gender } from '../../common/enums';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { AcceptBloodRequestStatus, GetUserDonationsQueryEnum } from '../enums';

export class AcceptBloodDonationRequestDto {
  @ApiProperty({ example: 'b0b54d87-2e45-442b-ab52-0ee89b3f301d' })
  @IsString()
  acceptedBloodRequestId: string;

  // @ApiProperty({ example: 50 })
  // @IsNumber()
  // @Min(0, { message: 'age can not be negative' })
  // patientAge: number;

  // @ApiProperty({ enum: BloodGroup, example: BloodGroup.AB_POSITIVE })
  // @IsEnum(BloodGroup)
  // bloodGroup: BloodGroup;

  // @ApiProperty({ example: '2023-10-04 05:11:40' })
  // @IsDateString()
  // donationDate: Date;

  // @ApiProperty({ example: '+977 9847574737' })
  // @IsPhoneNumber()
  // contactNumber: string;

  // @ApiProperty({ example: 'Nobel Hopital, KanchanBari, Biratnagar' })
  // @IsString()
  // address: string;
}

export class GetUserDonationsQueryDto {
  @ApiProperty({
    required: false,
    enum: GetUserDonationsQueryEnum,
    example: GetUserDonationsQueryEnum.INVITED,
  })
  @IsEnum(GetUserDonationsQueryEnum)
  @IsOptional()
  status: GetUserDonationsQueryEnum;
}
