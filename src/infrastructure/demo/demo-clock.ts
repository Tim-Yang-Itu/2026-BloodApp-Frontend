import type { IsoDateTime } from '@/shared/types/common'

/**
 * Titik acuan waktu untuk data demo.
 * Data contoh dihitung relatif terhadap saat aplikasi dimuat sehingga status
 * "mendekati kedaluwarsa" dan "jadwal mendatang" selalu terlihat wajar.
 */
const BASE_TIME = Date.now()
const DAY_MS = 86_400_000

export const fromNowDays = (days: number): IsoDateTime =>
  new Date(BASE_TIME + days * DAY_MS).toISOString()

export const dateInDays = (days: number): string => fromNowDays(days).slice(0, 10)
