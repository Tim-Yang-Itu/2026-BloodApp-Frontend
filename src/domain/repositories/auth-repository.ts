import type { User } from '@/domain/entities/user'
import type { BloodGroup, Rhesus } from '@/domain/enums/blood'

/** Sesi hasil login: token akses + profil pengguna. */
export interface AuthSession {
  readonly token: string
  readonly user: User
}

/** Kredensial login — AU-01, AR-01, PD-03 (login pendonor). */
export interface LoginCredentials {
  readonly email: string
  readonly password: string
}

/**
 * Data registrasi pendonor — PD-03.
 * `nik` dikirim mentah lewat HTTPS lalu dienkripsi di server (UU 27/2022).
 */
export interface RegisterDonorPayload {
  readonly fullName: string
  readonly email: string
  readonly password: string
  readonly nik: string
  readonly bloodGroup: BloodGroup
  readonly rhesus: Rhesus
  readonly phone: string
  readonly address: string | null
}

/**
 * Kontrak autentikasi. Implementasi HTTP berada di
 * `infrastructure/repositories/http-auth-repository.ts`.
 */
export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<AuthSession>
  registerDonor(payload: RegisterDonorPayload): Promise<AuthSession>
  fetchCurrentUser(token: string): Promise<User>
  logout(token: string): Promise<void>
}
