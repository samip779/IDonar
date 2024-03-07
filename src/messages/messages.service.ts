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
  async getInbox(userId: string) {
    const inbox: {
      counter_id: string;
      last_message_timestamp: string;
      last_message_content: string;
      firstname: string;
      lastname: string;
    }[] = await this.messagesRepository.query(
      ` SELECT 
          aggrg.counter_id,
          MAX(aggrg.created_at) AS last_message_timestamp,
          MAX(messages.content) AS last_message_content,
          users.firstname,
          users.lastname
        FROM
          (
            (
              SELECT 
                sender_id AS counter_id,
                MAX(created_at) as created_at
              FROM 
                messages
              WHERE 
                receiver_id = $1
              GROUP BY sender_id
            )
            UNION
            (
              SELECT
                receiver_id AS counter_id,
                MAX(created_at) as created_at
              FROM
                messages
              WHERE 
                sender_id = $1
              GROUP BY receiver_id
            )
          ) aggrg
        INNER JOIN messages ON (
          (aggrg.counter_id = messages.sender_id AND messages.receiver_id = $1)
          OR
          (aggrg.counter_id = messages.receiver_id AND messages.sender_id = $1)
        ) AND aggrg.created_at = messages.created_at
        INNER JOIN users ON users.id = aggrg.counter_id
        GROUP BY aggrg.counter_id, users.firstname, users.lastname
        ORDER BY last_message_timestamp DESC;
    
      `,
      [userId],
    );

    return inbox.map((i) => ({
      counterPartyId: i.counter_id,
      lastMessageTimestamp: i.last_message_timestamp,
      lastMessage: i.last_message_content,
      firstname: i.firstname,
      lastname: i.lastname,
    }));
  }

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
