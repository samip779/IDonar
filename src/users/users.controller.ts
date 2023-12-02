import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUsersService } from './interfaces/IUsersService';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: IUsersService) {}

  @Get()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create();
  }
}
