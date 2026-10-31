import type { DonorRegistrationStatus, ScreeningResult } from '@/domain/enums/donor'
import type { EntityId, IsoDateTime } from '@/shared/types/common'

/** Satu jawaban kuesioner screening yang dapat dikonfigurasi — PD-04. */
export interface ScreeningAnswer {
  readonly questionId: string
  readonly question: string
  readonly answer: boolean
}

/** Hasil screening kesehatan pendonor — PD-04. */
export interface HealthScreening {
  readonly id: EntityId
  readonly answers: readonly ScreeningAnswer[]
  readonly weightKg: number | null
  readonly hemoglobin: number | null
  readonly bloodPressure: string | null
  readonly result: ScreeningResult
  readonly notes: string | null
  readonly screenedAt: IsoDateTime | null
  readonly screenedBy: EntityId | null
}

/**
 * Pendaftaran donor di sebuah lokasi/jadwal + tiket QR — PD-05, EX-03.
 */
export interface DonorRegistration {
  readonly id: EntityId
  readonly donorId: EntityId
  readonly locationId: EntityId
  readonly scheduleId: EntityId
  /** Kode unik yang dirender menjadi QR Code pada tiket digital. */
  readonly ticketCode: string
  readonly screening: HealthScreening
  readonly status: DonorRegistrationStatus
  readonly checkedInAt: IsoDateTime | null
  readonly completedAt: IsoDateTime | null
  readonly createdAt: IsoDateTime
  readonly updatedAt: IsoDateTime
}
