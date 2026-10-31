import type { AuthFieldErrors, AuthFieldName } from '@/application/dto/auth.dto'
import { isAppError } from '@/domain/errors/app-error'

export interface FormErrorState {
  readonly fieldErrors: AuthFieldErrors
  readonly formError: string | null
}

const FALLBACK_MESSAGE = 'Terjadi kesalahan. Silakan coba lagi.'

/**
 * Mengubah error dari use case menjadi state form siap tampil.
 * Bila ada kesalahan per field, banner ringkasan tidak ditampilkan agar
 * pesan tidak berulang.
 */
export const toFormErrorState = (error: unknown): FormErrorState => {
  if (!isAppError(error)) {
    return { fieldErrors: {}, formError: FALLBACK_MESSAGE }
  }

  const fieldErrors: AuthFieldErrors = {}

  for (const [field, message] of Object.entries(error.fieldErrors)) {
    fieldErrors[field as AuthFieldName] = message
  }

  const hasFieldError = Object.keys(fieldErrors).length > 0

  return {
    fieldErrors,
    formError: hasFieldError ? null : error.message,
  }
}

/** Menghapus pesan kesalahan pada field yang baru saja diubah pengguna. */
export const clearFieldErrors = (
  errors: AuthFieldErrors,
  fields: readonly string[],
): AuthFieldErrors => {
  const next: AuthFieldErrors = { ...errors }

  for (const field of fields) {
    delete next[field as AuthFieldName]
  }

  return next
}
