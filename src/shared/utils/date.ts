/**
 * Operasi tanggal kalender murni.
 *
 * Tanggal di aplikasi disimpan sebagai `yyyy-mm-dd` (tanpa jam). Semua operasi
 * memakai UTC agar hasilnya tidak bergeser mengikuti zona waktu perangkat.
 */

const DAY_IN_MS = 24 * 60 * 60 * 1000

function toUtcDate(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00Z`)
}

/** `2026-11-01` + 35 → `2026-12-06`. */
export function addDays(isoDate: string, days: number): string {
  const date = toUtcDate(isoDate)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

/** Jumlah hari dari `earlier` ke `later`; negatif bila `later` lebih dulu. */
export function differenceInDays(later: string, earlier: string): number {
  return Math.round((toUtcDate(later).getTime() - toUtcDate(earlier).getTime()) / DAY_IN_MS)
}
