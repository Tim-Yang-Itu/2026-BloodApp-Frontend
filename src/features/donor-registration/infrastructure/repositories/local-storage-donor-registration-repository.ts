import type { DonorRegistration } from '../../domain/entities/donor-registration'
import type { DonorRegistrationRepository } from '../../domain/repositories/donor-registration-repository'
import { DEMO_REGISTRATIONS } from '../demo/demo-registrations'

/**
 * Implementasi demo penyimpanan pendaftaran donor.
 * Data bertahan setelah halaman dimuat ulang karena disimpan di `localStorage`.
 */

const STORAGE_KEY = 'donorku.registrations.v1'

function readAll(): DonorRegistration[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)

    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw) as DonorRegistration[]

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAll(registrations: DonorRegistration[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations))
  } catch {
    // Mode privat / kuota penuh: pendaftaran tetap bisa dipakai pada sesi ini.
  }
}

export class LocalStorageDonorRegistrationRepository implements DonorRegistrationRepository {
  constructor() {
    this.seedDemoRegistrations()
  }

  async listByUser(userId: string): Promise<DonorRegistration[]> {
    return this.read().filter((registration) => registration.userId === userId)
  }

  async findByCode(bookingCode: string): Promise<DonorRegistration | null> {
    const normalized = bookingCode.trim().toUpperCase()

    return (
      this.read().find((registration) => registration.bookingCode === normalized) ?? null
    )
  }

  async create(registration: DonorRegistration): Promise<void> {
    writeAll([registration, ...this.read()])
  }

  private read(): DonorRegistration[] {
    return readAll()
  }

  /** Mengisi riwayat contoh hanya bila penyimpanan masih kosong. */
  private seedDemoRegistrations(): void {
    if (this.read().length > 0) {
      return
    }

    writeAll([...DEMO_REGISTRATIONS])
  }
}
