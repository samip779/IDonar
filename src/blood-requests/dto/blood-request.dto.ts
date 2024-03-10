import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { BloodGroup, Gender } from '../../common/enums';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { BloodRequestStatus } from '../enums';
// import { PartialType } from '@nestjs/mapped-types';

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

  @ApiProperty({ example: 1, enum: [1, 2, 3] })
  @IsNumber()
  @Min(1)
  @Max(3)
  priority: number;

  @ApiProperty({ example: '+977 9847574737' })
  @IsPhoneNumber()
  contactNumber: string;

  @ApiProperty({ example: 'Biratnagar' })
  @IsString()
  address: string;

  @ApiProperty({ example: 37.4220936 })
  @IsLatitude()
  @IsOptional()
  latitude: number;

  @ApiProperty({ example: -122.083922 })
  @IsLongitude()
  @IsOptional()
  longitude: number;
}

export class UpdateBloodRequestDto extends PartialType(BloodRequestDto) {}

export class GetBloodRequestsReponse extends BloodRequestDto {
  @ApiProperty({ example: '487d1398-f9e7-403a-af96-17589e97475b' })
  id: string;

  @ApiProperty({ example: '2023-12-27T02:19:23.169Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-12-27T02:20:07.992Z' })
  updatedAt: Date;
}

export class GetBloodRequestsQueryDto {
  @ApiPropertyOptional({
    example: '234.23434',
  })
  @IsLatitude()
  @IsOptional()
  @Type(() => Number)
  lat: number;

  @ApiPropertyOptional({
    example: '234.23434',
  })
  @IsLatitude()
  @IsOptional()
  @Type(() => Number)
  lon: number;
}

export class GetUsersRequestQueryDto {
  @ApiProperty({
    required: false,
    enum: BloodRequestStatus,
    example: BloodRequestStatus.PENDING,
  })
  @IsEnum(BloodRequestStatus)
  @IsOptional()
  status: BloodRequestStatus;
}
