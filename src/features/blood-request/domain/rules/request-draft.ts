/**
 * Aturan pengajuan permintaan baru (RS-03).
 *
 * Angka batas jumlah kantong dipakai bersama oleh form dan use case agar
 * pesan validasi di UI dan di lapisan bisnis tidak pernah berbeda.
 */

export const MIN_REQUEST_QUANTITY = 1

/** Satu pengajuan dibatasi agar UTD bisa memenuhinya dalam satu pengiriman. */
export const MAX_REQUEST_QUANTITY = 20

/** Jumlah kantong harus bilangan bulat di dalam rentang yang diizinkan. */
export function isRequestQuantityInRange(quantity: number): boolean {
  return (
    Number.isInteger(quantity) &&
    quantity >= MIN_REQUEST_QUANTITY &&
    quantity <= MAX_REQUEST_QUANTITY
  )
}

/** `REQ-0091` → `REQ-0092`, melanjutkan nomor terbesar yang ada. */
export function nextRequestId(ids: readonly string[]): string {
  const highest = ids.reduce((current, id) => {
    const match = /^REQ-(\d+)$/.exec(id)
    return match ? Math.max(current, Number(match[1])) : current
  }, 0)

  return `REQ-${String(highest + 1).padStart(4, '0')}`
}
