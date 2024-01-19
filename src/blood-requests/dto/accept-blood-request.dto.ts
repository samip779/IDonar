import { ApiProperty } from '@nestjs/swagger';
import { BloodGroup, Gender } from '../../common/enums';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class AcceptBloodRequestDto {
  @ApiProperty({ example: '5c2fb63f-8492-46c5-b312-96bdae25daab' })
  @IsUUID()
  bloodRequestId: string;

  @ApiProperty({ example: 'Ramesh Bahadur Thapa' })
  @IsString()
  donorFullName: string;

  @ApiProperty({ enum: Gender, example: Gender.FEMALE })
  @IsEnum(Gender)
  donorGender: Gender;

  @ApiProperty({ example: '+977 9847574737' })
  @IsPhoneNumber()
  donorContactNumber: string;

  @ApiProperty({ enum: BloodGroup, example: BloodGroup.AB_POSITIVE })
  @IsEnum(BloodGroup)
  donorBloodGroup: BloodGroup;

  @ApiProperty({ example: 165 })
  @IsNumber()
  donorHeight: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  donorWeight: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(18, { message: 'age cannot be less than 18' })
  @Max(60, { message: 'age cannot be more than 60' })
  donorAge: number;

  @ApiProperty({ example: 'Biratnagar' })
  @IsString()
  donorAddress: string;

  @ApiProperty({ example: 'Type 2 Diabeties', required: false })
  @IsOptional()
  @IsString()
  donorDiseases?: string;
}
