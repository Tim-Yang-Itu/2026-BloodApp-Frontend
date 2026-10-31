import type { BloodComponent, BloodGroup, Rhesus } from '@/domain/enums/blood'
import type { EntityId, IsoDateTime } from '@/shared/types/common'

/**
 * Profil pendonor — PRD PD-03 & EX-04.
 * `nikEncrypted` disimpan dalam bentuk terenkripsi (UU 27/2022), jangan pernah
 * ditampilkan apa adanya di UI.
 */
export interface Donor {
  readonly id: EntityId
  readonly userId: EntityId
  readonly nikEncrypted: string
  readonly bloodGroup: BloodGroup
  readonly rhesus: Rhesus
  readonly phone: string
  readonly address: string | null
  readonly lastDonationAt: IsoDateTime | null
  /** Dihitung dari interval donor minimal yang dapat dikonfigurasi — EX-04. */
  readonly nextEligibleAt: IsoDateTime | null
  readonly createdAt: IsoDateTime
  readonly updatedAt: IsoDateTime
}

/** Riwayat donasi pendonor — PD-04, EX-04. */
export interface DonationRecord {
  readonly id: EntityId
  readonly donorId: EntityId
  readonly registrationId: EntityId
  readonly facilityId: EntityId
  readonly donatedAt: IsoDateTime
  readonly component: BloodComponent
  readonly notes: string | null
  readonly createdAt: IsoDateTime
}
