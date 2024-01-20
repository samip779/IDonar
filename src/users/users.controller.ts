import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { GetUser } from '../decorators/get-user.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUserDetails(@GetUser('id') id: string) {
    return this.usersService.findOneBy(
      { id },
      {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        bloodGroup: true,
        gender: true,
        weight: true,
        phone: true,
        city: true,
        province: true,
        street: true,
      },
    );
  }
}
