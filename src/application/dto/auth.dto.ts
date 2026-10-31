import type { User } from '@/domain/entities/user'
import type { BloodGroup, Rhesus } from '@/domain/enums/blood'
import type { UserRole } from '@/domain/enums/user'

/** Masukan form login. */
export interface LoginInput {
  readonly email: string
  readonly password: string
}

/** Masukan form registrasi pendonor — PD-03. */
export interface RegisterDonorInput {
  readonly fullName: string
  readonly email: string
  readonly password: string
  readonly confirmPassword: string
  readonly nik: string
  readonly bloodGroup: BloodGroup | ''
  readonly rhesus: Rhesus | ''
  readonly phone: string
  readonly address: string
}

/** Data pengguna yang boleh beredar di UI (tanpa field sensitif). */
export interface AuthenticatedUser {
  readonly id: string
  readonly email: string
  readonly fullName: string
  readonly role: UserRole
  readonly facilityId: string | null
  readonly mfaEnabled: boolean
}

/** Nama field form yang dapat menerima pesan kesalahan. */
export type AuthFieldName =
  | 'fullName'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'nik'
  | 'phone'
  | 'bloodGroup'
  | 'rhesus'
  | 'address'
  | 'form'

export type AuthFieldErrors = Partial<Record<AuthFieldName, string>>

/** Menyeragamkan entity `User` menjadi objek aman untuk UI. */
export const toAuthenticatedUser = (user: User): AuthenticatedUser => ({
  id: user.id,
  email: user.email,
  fullName: user.fullName,
  role: user.role,
  facilityId: user.facilityId,
  mfaEnabled: user.mfaEnabled,
})
