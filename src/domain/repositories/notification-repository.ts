import type { Notification } from '@/domain/entities/notification'
import type { EntityId } from '@/shared/types/common'

/** Kontrak akses data notifikasi in-app — AU-03, AR-05. */
export interface NotificationRepository {
  listByUser(userId: EntityId): Promise<readonly Notification[]>
  save(notification: Notification): Promise<Notification>
  markAsRead(id: EntityId): Promise<void>
}
