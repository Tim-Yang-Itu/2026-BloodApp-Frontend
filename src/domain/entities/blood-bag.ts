import type {
  BloodBagStatus,
  BloodComponent,
  BloodGroup,
  BloodTestStatus,
  Rhesus,
} from '@/domain/enums/blood'
import type { EntityId, IsoDateTime } from '@/shared/types/common'

/**
 * Kantong darah beserta status uji — PRD AU-02, EX-01.
 * Kantong hanya boleh dihitung sebagai stok bila `testStatus === 'passed'`.
 */
export interface BloodBag {
  readonly id: EntityId
  readonly facilityId: EntityId
  /** Nomor kantong unik dari UTD/PMI. */
  readonly bagNumber: string
  readonly bloodGroup: BloodGroup
  readonly rhesus: Rhesus
  readonly component: BloodComponent
  readonly volumeMl: number
  readonly collectedAt: IsoDateTime
  readonly expiresAt: IsoDateTime
  readonly testedAt: IsoDateTime | null
  readonly testStatus: BloodTestStatus
  readonly status: BloodBagStatus
  readonly createdAt: IsoDateTime
  readonly updatedAt: IsoDateTime
}
