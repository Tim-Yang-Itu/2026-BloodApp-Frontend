/**
 * Format tanggal & jarak untuk UI berbahasa Indonesia.
 *
 * Tanggal di aplikasi disimpan sebagai tanggal kalender `yyyy-mm-dd` (tanpa jam).
 * Semua formatter memakai `timeZone: 'UTC'` agar label hari tidak bergeser
 * mengikuti zona waktu perangkat pengguna.
 */

const WEEKDAY_FORMATTER = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  timeZone: 'UTC',
})

const SHORT_DATE_FORMATTER = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
})

const LONG_DATE_FORMATTER = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function toCalendarDate(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00Z`)
}

/** `2026-11-04` → `Rabu` */
export function formatWeekday(isoDate: string): string {
  return capitalize(WEEKDAY_FORMATTER.format(toCalendarDate(isoDate)))
}

/** `2026-11-04` → `4 Nov` */
export function formatShortDate(isoDate: string): string {
  return SHORT_DATE_FORMATTER.format(toCalendarDate(isoDate))
}

/** `2026-11-04` → `Rabu, 4 Nov 2026` */
export function formatLongDate(isoDate: string): string {
  return capitalize(LONG_DATE_FORMATTER.format(toCalendarDate(isoDate)))
}

/** `2.4` → `2,4 km` (pemisah desimal mengikuti kebiasaan Indonesia). */
export function formatDistance(distanceKm: number): string {
  return `${distanceKm.toFixed(1).replace('.', ',')} km`
}

const TIME_FORMATTER = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'UTC',
})

/** `2026-11-02T03:40:00.000Z` → `10.40` */
export function formatTime(isoDateTime: string): string {
  return TIME_FORMATTER.format(new Date(isoDateTime))
}
