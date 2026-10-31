/**
 * Kode kesalahan aplikasi yang dipakai lintas lapisan.
 * Dipetakan dari status HTTP pada lapisan infrastructure.
 */
export const APP_ERROR_CODES = [
  'validation_failed',
  'invalid_credentials',
  'email_already_registered',
  'unauthorized',
  'forbidden',
  'not_found',
  'network_error',
  'unknown',
] as const

export type AppErrorCode = (typeof APP_ERROR_CODES)[number]

/** Bentuk kesalahan yang aman ditampilkan ke pengguna (bahasa Indonesia). */
export class AppError extends Error {
  readonly code: AppErrorCode
  readonly fieldErrors: Readonly<Record<string, string>>

  constructor(
    code: AppErrorCode,
    message: string,
    fieldErrors: Record<string, string> = {},
  ) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.fieldErrors = fieldErrors
  }
}

export const isAppError = (error: unknown): error is AppError =>
  error instanceof AppError
