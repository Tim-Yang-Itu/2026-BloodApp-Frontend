import type { EntityId, IsoDateTime } from '@/shared/types/common'

/** Lokasi donor darah yang tampil di landing page — PD-01, PD-02, EX-02. */
export interface DonorLocation {
  readonly id: EntityId
  readonly facilityId: EntityId
  readonly name: string
  readonly address: string
  readonly city: string
  readonly latitude: number | null
  readonly longitude: number | null
  readonly isActive: boolean
  readonly createdAt: IsoDateTime
  readonly updatedAt: IsoDateTime
}

/** Jadwal layanan donor pada satu lokasi — PD-02, EX-02. */
export interface DonorSchedule {
  readonly id: EntityId
  readonly locationId: EntityId
  /** Tanggal layanan (YYYY-MM-DD). */
  readonly date: string
  /** Jam mulai (HH:mm). */
  readonly startTime: string
  /** Jam selesai (HH:mm). */
  readonly endTime: string
  readonly quota: number
  readonly registeredCount: number
  readonly createdAt: IsoDateTime
  readonly updatedAt: IsoDateTime
}

/** Lokasi beserta jadwalnya untuk halaman detail — PD-02. */
export interface DonorLocationWithSchedules extends DonorLocation {
  readonly schedules: readonly DonorSchedule[]
}
