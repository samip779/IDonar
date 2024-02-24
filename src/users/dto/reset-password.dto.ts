import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordOTPDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsEmail()
  email: string;
}

export class VerifyResetPasswordOtpDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', maxLength: 6, minLength: 6 })
  @IsString()
  @MaxLength(6)
  @MinLength(6)
  code: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: '123456', maxLength: 6, minLength: 6 })
  @IsString()
  @MaxLength(6)
  @MinLength(6)
  code: string;
}
