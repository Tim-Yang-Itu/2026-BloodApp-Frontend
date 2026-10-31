import type { DonationRecord, Donor } from '@/domain/entities/donor'
import type { EntityId } from '@/shared/types/common'

/** Kontrak akses data pendonor & riwayat donasi — PD-03, EX-04. */
export interface DonorRepository {
  findById(id: EntityId): Promise<Donor | null>
  findByUserId(userId: EntityId): Promise<Donor | null>
  save(donor: Donor): Promise<Donor>
  listDonations(donorId: EntityId): Promise<readonly DonationRecord[]>
  addDonation(record: DonationRecord): Promise<DonationRecord>
}
