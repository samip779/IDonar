import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { GetUser } from '../decorators/get-user.decorator';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('conversation/:counterPartyId')
  async getConversation(
    @Param('counterPartyId') counterPartyId: string,
    @GetUser('id') userId: string,
  ) {
    return this.messagesService.getConversation(userId, counterPartyId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('inbox')
  async getUserInbox(@GetUser('id') userId: string) {
    return this.messagesService.getInbox(userId);
  }
}
