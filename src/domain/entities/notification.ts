import type { NotificationChannel, NotificationType } from '@/domain/enums/notification'
import type { EntityId, IsoDateTime } from '@/shared/types/common'

/** Notifikasi kedaluwarsa stok dan perubahan status request — AU-03, AR-05. */
export interface Notification {
  readonly id: EntityId
  readonly userId: EntityId
  readonly type: NotificationType
  readonly channel: NotificationChannel
  readonly title: string
  readonly message: string
  readonly referenceId: EntityId | null
  readonly isRead: boolean
  readonly createdAt: IsoDateTime
}
