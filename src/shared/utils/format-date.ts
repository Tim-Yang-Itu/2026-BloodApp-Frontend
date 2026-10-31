import { LOCALE, TIME_ZONE } from '@/shared/constants/app'
import type { IsoDateTime } from '@/shared/types/common'

const toDate = (value: IsoDateTime | Date): Date =>
  value instanceof Date ? value : new Date(value)

const dateFormatter = new Intl.DateTimeFormat(LOCALE, {
  dateStyle: 'medium',
  timeZone: TIME_ZONE,
})

const dateTimeFormatter = new Intl.DateTimeFormat(LOCALE, {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: TIME_ZONE,
})

const timeFormatter = new Intl.DateTimeFormat(LOCALE, {
  timeStyle: 'short',
  timeZone: TIME_ZONE,
})

/** Contoh: "31 Okt 2026". */
export const formatDate = (value: IsoDateTime | Date): string =>
  dateFormatter.format(toDate(value))

/** Contoh: "31 Okt 2026, 14.30". */
export const formatDateTime = (value: IsoDateTime | Date): string =>
  dateTimeFormatter.format(toDate(value))

/** Contoh: "14.30". */
export const formatTime = (value: IsoDateTime | Date): string =>
  timeFormatter.format(toDate(value))

/**
 * Apakah tanggal sudah lewat dibandingkan waktu acuan (default: sekarang).
 * Dipakai UI untuk menampilkan status "sekarang" tanpa memanggil jam di render.
 */
export const isPastDate = (value: IsoDateTime | Date, reference?: Date): boolean =>
  toDate(value).getTime() <= (reference ?? new Date()).getTime()
