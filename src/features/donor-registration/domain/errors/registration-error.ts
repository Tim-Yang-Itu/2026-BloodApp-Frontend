/** Error bisnis pendaftaran donor. Pesan siap ditampilkan di form. */

export const REGISTRATION_ERROR_CODES = ['invalid-input', 'incomplete-screening'] as const
export type RegistrationErrorCode = (typeof REGISTRATION_ERROR_CODES)[number]

export class RegistrationError extends Error {
  readonly code: RegistrationErrorCode

  constructor(code: RegistrationErrorCode, message: string) {
    super(message)
    this.name = 'RegistrationError'
    this.code = code
  }
}

/** Mengubah error tak dikenal menjadi pesan yang layak ditampilkan. */
export function registrationErrorMessage(error: unknown): string {
  if (error instanceof RegistrationError) {
    return error.message
  }

  return 'Pendaftaran gagal dikirim. Coba lagi beberapa saat.'
}
