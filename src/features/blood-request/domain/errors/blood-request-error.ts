/** Error bisnis permintaan darah. Pesan siap ditampilkan di UI. */

export const BLOOD_REQUEST_ERROR_CODES = [
  'invalid-input',
  'not-found',
  'invalid-transition',
  'reason-required',
] as const
export type BloodRequestErrorCode = (typeof BLOOD_REQUEST_ERROR_CODES)[number]

export class BloodRequestError extends Error {
  readonly code: BloodRequestErrorCode

  constructor(code: BloodRequestErrorCode, message: string) {
    super(message)
    this.name = 'BloodRequestError'
    this.code = code
  }
}

/** Mengubah error tak dikenal menjadi pesan yang layak ditampilkan. */
export function bloodRequestErrorMessage(error: unknown): string {
  if (error instanceof BloodRequestError) {
    return error.message
  }

  return 'Permintaan gagal diproses. Coba lagi beberapa saat.'
}
