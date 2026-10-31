import type { DonorRegistration } from '@/domain/entities/donor-registration'
import type { EntityId } from '@/shared/types/common'

/** Kontrak akses data pendaftaran donor & tiket QR — PD-05, EX-03. */
export interface DonorRegistrationRepository {
  findById(id: EntityId): Promise<DonorRegistration | null>
  findByTicketCode(ticketCode: string): Promise<DonorRegistration | null>
  listBySchedule(scheduleId: EntityId): Promise<readonly DonorRegistration[]>
  listByDonor(donorId: EntityId): Promise<readonly DonorRegistration[]>
  save(registration: DonorRegistration): Promise<DonorRegistration>
}
