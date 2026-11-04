import type { DonorRegistration } from '../entities/donor-registration'

/**
 * Kontrak penyimpanan pendaftaran donor.
 * Implementasi demo memakai `localStorage`; kontrak ini tidak menyebut
 * teknologi apa pun sehingga bisa diganti repository HTTP nanti.
 */
export interface DonorRegistrationRepository {
  /** Semua pendaftaran milik satu pengguna, terbaru lebih dulu. */
  listByUser(userId: string): Promise<DonorRegistration[]>

  findByCode(bookingCode: string): Promise<DonorRegistration | null>

  create(registration: DonorRegistration): Promise<void>
}
