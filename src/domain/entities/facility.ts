import type { FacilityType } from '@/domain/enums/user'
import type { EntityId, IsoDateTime } from '@/shared/types/common'

/** Fasilitas mitra: UTD/PMI atau rumah sakit — PRD §7. */
export interface Facility {
  readonly id: EntityId
  readonly name: string
  readonly type: FacilityType
  readonly address: string
  readonly city: string
  readonly phone: string
  readonly isActive: boolean
  readonly createdAt: IsoDateTime
  readonly updatedAt: IsoDateTime
}
