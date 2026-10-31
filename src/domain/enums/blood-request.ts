/**
 * Alur status request — PRD §6:
 * menunggu -> disetujui -> diterima RS, cabang menunggu -> ditolak (alasan wajib).
 */
export const BLOOD_REQUEST_STATUSES = [
  'pending',
  'approved',
  'rejected',
  'received',
] as const

export type BloodRequestStatus = (typeof BLOOD_REQUEST_STATUSES)[number]

/** Tingkat urgensi permintaan dari RS (AR-03). */
export const REQUEST_URGENCIES = ['routine', 'urgent', 'emergency'] as const

export type RequestUrgency = (typeof REQUEST_URGENCIES)[number]
