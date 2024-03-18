import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: 'password1234' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ example: 'password1234' })
  @IsString()
  @MinLength(8)
  newPassword: string;
}
