import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async insertNotification(
    message: string,
    notifierId?: string,
  ): Promise<Notification> {
    const notification = await this.notificationRepository.save({
      message,
      notifierId: notifierId ? notifierId : null,
    });

    return notification;
  }

  async getUsersNotifications(userId: string): Promise<Notification[]> {
    const notifications = await this.notificationRepository.find({
      select: ['id', 'message', 'createdAt', 'seen', 'notifierId'],
      where: [{ notifierId: userId }, { notifierId: IsNull() }],
      order: { createdAt: { direction: 'DESC', nulls: 'LAST' } },
    });

    return notifications;
  }
}
