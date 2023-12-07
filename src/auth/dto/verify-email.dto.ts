import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', maxLength: 6, minLength: 6 })
  @IsString()
  @MaxLength(6)
  @MinLength(6)
  code: string;
}
