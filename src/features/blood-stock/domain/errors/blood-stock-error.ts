/** Error bisnis stok darah. Pesan siap ditampilkan di UI. */

export const BLOOD_STOCK_ERROR_CODES = ['invalid-input', 'not-found'] as const
export type BloodStockErrorCode = (typeof BLOOD_STOCK_ERROR_CODES)[number]

export class BloodStockError extends Error {
  readonly code: BloodStockErrorCode

  constructor(code: BloodStockErrorCode, message: string) {
    super(message)
    this.name = 'BloodStockError'
    this.code = code
  }
}

/** Mengubah error tak dikenal menjadi pesan yang layak ditampilkan. */
export function bloodStockErrorMessage(error: unknown): string {
  if (error instanceof BloodStockError) {
    return error.message
  }

  return 'Data stok gagal diproses. Coba lagi beberapa saat.'
}
