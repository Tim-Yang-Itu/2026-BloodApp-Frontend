/**
 * Error bisnis autentikasi.
 * Pesan sudah berbahasa Indonesia agar aman ditampilkan langsung di form.
 */

export const AUTH_ERROR_CODES = ['invalid-input', 'invalid-credentials', 'email-taken'] as const
export type AuthErrorCode = (typeof AUTH_ERROR_CODES)[number]

export class AuthError extends Error {
  readonly code: AuthErrorCode

  constructor(code: AuthErrorCode, message: string) {
    super(message)
    this.name = 'AuthError'
    this.code = code
  }
}

/** Mengubah error tak dikenal menjadi pesan yang layak ditampilkan. */
export function authErrorMessage(error: unknown): string {
  if (error instanceof AuthError) {
    return error.message
  }

  return 'Terjadi gangguan. Coba lagi beberapa saat.'
}
