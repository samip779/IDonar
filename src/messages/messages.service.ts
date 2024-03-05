import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  async insertMessage(message: {
    senderId: string;
    receiverId: string;
    content: string;
  }) {
    const insertedMessage = await this.messagesRepository.save(message);
    return insertedMessage;
  }

  //   TODO
  async getInbox(userId: string) {}

  async getConversation(userId: string, counterPartyId: string) {
    const conversations = await this.messagesRepository.find({
      where: [
        { senderId: userId, receiverId: counterPartyId },
        { senderId: counterPartyId, receiverId: userId },
      ],
      order: {
        createdAt: 'DESC',
      },
    });

    return conversations;
  }
}
