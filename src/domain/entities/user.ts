import type { UserRole } from '@/domain/enums/user'
import type { EntityId, IsoDateTime } from '@/shared/types/common'

/** Pengguna platform (Admin UTD/PMI, Admin RS, Pendonor) — PRD §7. */
export interface User {
  readonly id: EntityId
  readonly email: string
  readonly fullName: string
  readonly role: UserRole
  /** Diisi untuk peran admin; `null` untuk pendonor. */
  readonly facilityId: EntityId | null
  /** MFA wajib untuk akun admin — PRD §2. */
  readonly mfaEnabled: boolean
  readonly createdAt: IsoDateTime
  readonly updatedAt: IsoDateTime
}
