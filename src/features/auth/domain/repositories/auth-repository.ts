import type { AuthUser } from '../entities/user'

export type LoginCredentials = {
  email: string
  password: string
}

/**
 * Kontrak penyimpanan akun & sesi.
 *
 * Implementasi demo memakai `localStorage`, tetapi kontrak ini tidak
 * menyebut teknologi apa pun sehingga bisa diganti repository HTTP nanti.
 */
export interface AuthRepository {
  /** Mencari akun berdasarkan email yang sudah dinormalisasi (lowercase). */
  findByEmail(email: string): Promise<AuthUser | null>

  findById(userId: string): Promise<AuthUser | null>

  /** Mengembalikan pengguna bila kredensial cocok, `null` bila tidak. */
  authenticate(credentials: LoginCredentials): Promise<AuthUser | null>

  /** Menyimpan akun baru. Melempar `AuthError('email-taken')` bila email sudah dipakai. */
  create(user: AuthUser, password: string): Promise<void>

  /** ID pengguna yang sedang login pada perangkat ini, atau `null`. */
  readSession(): Promise<string | null>

  /** `null` menghapus sesi (logout). */
  writeSession(userId: string | null): Promise<void>
}
