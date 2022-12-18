import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repositories';
import { NotificationNotFound } from './errors/notification-not-found';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificastionResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificastionResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) throw new NotificationNotFound();

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
