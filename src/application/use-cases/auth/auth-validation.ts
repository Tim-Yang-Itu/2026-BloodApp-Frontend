import type { AuthFieldErrors, LoginInput, RegisterDonorInput } from '@/application/dto/auth.dto'
import { BLOOD_GROUPS, RHESUS_TYPES } from '@/domain/enums/blood'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
/** NIK Indonesia: tepat 16 digit angka. */
const NIK_PATTERN = /^\d{16}$/
/** Nomor seluler Indonesia: 08xx, 628xx, atau +628xx. */
const PHONE_PATTERN = /^(?:\+62|62|0)8[1-9][0-9]{6,11}$/

export const MIN_PASSWORD_LENGTH = 8
const MIN_NAME_LENGTH = 3
const MIN_ADDRESS_LENGTH = 5

/** Menyeragamkan NIK: hanya digit. */
export const normalizeNik = (value: string): string => value.replace(/\D/g, '')

/** Menyeragamkan nomor telepon: hanya digit, awalan "+" dibuang. */
export const normalizePhone = (value: string): string =>
  value.trim().replace(/[\s-]/g, '').replace(/^\+/, '')

/** Mengembalikan `null` bila kosong, string kosong bila terlalu pendek. */
const parseOptionalText = (value: string, minLength: number): string | null => {
  const trimmed = value.trim()
  if (trimmed.length === 0) return null
  if (trimmed.length < minLength) return ''
  return trimmed
}

/** Validasi form login — AU-01, AR-01. */
export const validateLoginInput = (input: LoginInput): AuthFieldErrors => {
  const errors: AuthFieldErrors = {}

  if (!input.email.trim()) {
    errors.email = 'Email wajib diisi.'
  } else if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = 'Format email tidak valid.'
  }

  if (!input.password) {
    errors.password = 'Kata sandi wajib diisi.'
  } else if (input.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Kata sandi minimal ${MIN_PASSWORD_LENGTH} karakter.`
  }

  return errors
}

/** Validasi form registrasi pendonor — PD-03. */
export const validateRegisterDonorInput = (input: RegisterDonorInput): AuthFieldErrors => {
  const errors: AuthFieldErrors = {}

  if (input.fullName.trim().length < MIN_NAME_LENGTH) {
    errors.fullName = `Nama lengkap minimal ${MIN_NAME_LENGTH} karakter.`
  }

  if (!input.email.trim()) {
    errors.email = 'Email wajib diisi.'
  } else if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = 'Format email tidak valid.'
  }

  if (!NIK_PATTERN.test(normalizeNik(input.nik))) {
    errors.nik = 'NIK harus terdiri dari 16 digit angka.'
  }

  if (!PHONE_PATTERN.test(normalizePhone(input.phone))) {
    errors.phone = 'Nomor WhatsApp tidak valid (contoh: 08123456789).'
  }

  const bloodGroup: string = input.bloodGroup
  if (!BLOOD_GROUPS.some((group) => group === bloodGroup)) {
    errors.bloodGroup = 'Golongan darah wajib dipilih.'
  }

  const rhesus: string = input.rhesus
  if (!RHESUS_TYPES.some((type) => type === rhesus)) {
    errors.rhesus = 'Rhesus wajib dipilih.'
  }

  if (input.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Kata sandi minimal ${MIN_PASSWORD_LENGTH} karakter.`
  }

  if (input.confirmPassword !== input.password) {
    errors.confirmPassword = 'Konfirmasi kata sandi tidak sama.'
  }

  if (parseOptionalText(input.address, MIN_ADDRESS_LENGTH) === '') {
    errors.address = `Alamat minimal ${MIN_ADDRESS_LENGTH} karakter bila diisi.`
  }

  return errors
}

export const hasFieldErrors = (errors: AuthFieldErrors): boolean =>
  Object.keys(errors).length > 0
