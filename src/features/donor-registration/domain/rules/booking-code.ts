/**
 * Kode booking tiket donor, mis. `DK-20261104-0042`.
 * Memuat tanggal donor supaya petugas bisa menebak jadwal hanya dari kodenya.
 */
export function createBookingCode(date: string, sequence: number): string {
  const compactDate = date.replaceAll('-', '')
  const suffix = String(Math.abs(sequence) % 10000).padStart(4, '0')

  return `DK-${compactDate}-${suffix}`
}
