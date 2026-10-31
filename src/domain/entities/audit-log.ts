import type { AuditAction } from '@/domain/enums/audit'
import type { UserRole } from '@/domain/enums/user'
import type { EntityId, IsoDateTime } from '@/shared/types/common'

/**
 * Audit log append-only untuk setiap akses/perubahan data sensitif — PRD §5 & §8.
 * Tidak boleh diubah atau dihapus.
 */
export interface AuditLog {
  readonly id: EntityId
  readonly actorId: EntityId
  readonly actorRole: UserRole
  readonly action: AuditAction
  readonly entityType: string
  readonly entityId: EntityId
  readonly metadata: Readonly<Record<string, unknown>>
  readonly ipAddress: string | null
  readonly createdAt: IsoDateTime
}
