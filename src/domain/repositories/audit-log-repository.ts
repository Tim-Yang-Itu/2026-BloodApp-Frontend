import type { AuditLog } from '@/domain/entities/audit-log'
import type { EntityId } from '@/shared/types/common'

/** Kontrak audit log append-only — PRD §5. */
export interface AuditLogRepository {
  append(log: AuditLog): Promise<void>
  listByEntity(entityType: string, entityId: EntityId): Promise<readonly AuditLog[]>
}
