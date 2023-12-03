import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender, BloodGroup } from 'src/users/enums';
import { IRegisterParam } from '../interfaces/IAuthService';

export class CreateUserDto implements IRegisterParam {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstname: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastname: string;

  @ApiProperty({ enum: Gender, example: Gender.FEMALE })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ example: 160 })
  @IsNumber()
  height: number;

  @ApiProperty({ example: 60 })
  @IsNumber()
  weight: number;

  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'Biratnagar' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Koshi' })
  @IsString()
  province: string;

  @ApiProperty({ example: 'Kanchanbari' })
  @IsString()
  street: string;

  @ApiProperty({ example: '+977 9847574737' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: BloodGroup.AB_POSITIVE,
    enum: BloodGroup,
    required: false,
  })
  @IsOptional()
  @IsEnum(BloodGroup)
  bloodGroup?: BloodGroup;
}
