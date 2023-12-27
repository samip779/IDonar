import { IsDateString, IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { BloodGroup, Gender } from '../../common/enums';
import { ApiProperty } from '@nestjs/swagger';

export class BloodRequestDto {
  @ApiProperty({ enum: Gender, example: Gender.FEMALE })
  @IsEnum(Gender)
  patientGender: Gender;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(0, { message: 'age can not be negative' })
  patientAge: number;

  @ApiProperty({ enum: BloodGroup, example: BloodGroup.AB_POSITIVE })
  @IsEnum(BloodGroup)
  bloodGroup: BloodGroup;

  @ApiProperty({ example: '2023-10-04 05:11:40' })
  @IsDateString()
  donationDate: Date;

  @ApiProperty({ example: 'Nobel Hopital, KanchanBari, Biratnagar' })
  @IsString()
  address: string;
}

export class GetBloodRequestsReponse extends BloodRequestDto {
  @ApiProperty({ example: '487d1398-f9e7-403a-af96-17589e97475b' })
  id: string;

  @ApiProperty({ example: '2023-12-27T02:19:23.169Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-12-27T02:20:07.992Z' })
  updatedAt: Date;
}
