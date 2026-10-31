import type { NotificationChannel } from '@/domain/enums/notification'
import type { EntityId } from '@/shared/types/common'

export interface SendNotificationInput {
  readonly userId: EntityId
  readonly channel: NotificationChannel
  readonly title: string
  readonly message: string
  readonly referenceId?: EntityId
}

/**
 * Port pengiriman notifikasi (in-app/email/WhatsApp) — AU-03, AR-05.
 * Nama `Gateway` dipakai agar tidak tertukar dengan `NotificationRepository`.
 */
export interface NotificationGateway {
  send(input: SendNotificationInput): Promise<void>
}
