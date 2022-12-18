import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repositories';

interface CountRecipientNotificationRequest {
  recipientId: string;
}

interface CountRecipientNotificastionResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CountRecipientNotificationRequest,
  ): Promise<CountRecipientNotificastionResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
