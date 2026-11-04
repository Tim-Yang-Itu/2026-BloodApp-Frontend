import type { AuthUser } from '../../domain/entities/user'
import type { AuthRepository, LoginCredentials } from '../../domain/repositories/auth-repository'
import { AuthError } from '../../domain/errors/auth-error'
import { DEMO_ACCOUNTS } from '../demo/demo-accounts'

/**
 * Implementasi demo penyimpanan akun & sesi memakai `localStorage`.
 *
 * Catatan keamanan: hash di bawah ini BUKAN kriptografi dan hanya dipakai agar
 * password tidak tersimpan sebagai teks biasa di demo. Saat backend tersedia,
 * repository ini diganti implementasi HTTP dan hashing menjadi tugas server.
 */

const ACCOUNTS_KEY = 'donorku.auth.accounts.v1'
const SESSION_KEY = 'donorku.auth.session.v1'

type StoredAccount = {
  user: AuthUser
  passwordHash: string
}

function hashPassword(password: string): string {
  let hash = 5381

  for (let index = 0; index < password.length; index += 1) {
    hash = ((hash << 5) + hash + password.charCodeAt(index)) | 0
  }

  return `demo-${(hash >>> 0).toString(36)}`
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)

    if (!raw) {
      return fallback
    }

    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Mode privat / kuota penuh: aplikasi tetap jalan, hanya sesi tidak tersimpan.
  }
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function toStoredAccount(user: AuthUser, password: string): StoredAccount {
  return { user, passwordHash: hashPassword(password) }
}

export class LocalStorageAuthRepository implements AuthRepository {
  constructor() {
    this.seedDemoAccounts()
  }

  async findByEmail(email: string): Promise<AuthUser | null> {
    const account = this.readAccounts().find(
      (item) => item.user.email === normalizeEmail(email),
    )

    return account?.user ?? null
  }

  async findById(userId: string): Promise<AuthUser | null> {
    const account = this.readAccounts().find((item) => item.user.id === userId)

    return account?.user ?? null
  }

  async authenticate(credentials: LoginCredentials): Promise<AuthUser | null> {
    const account = this.readAccounts().find(
      (item) => item.user.email === normalizeEmail(credentials.email),
    )

    if (!account) {
      return null
    }

    return account.passwordHash === hashPassword(credentials.password) ? account.user : null
  }

  async create(user: AuthUser, password: string): Promise<void> {
    const accounts = this.readAccounts()

    if (accounts.some((item) => item.user.email === normalizeEmail(user.email))) {
      throw new AuthError('email-taken', 'Email ini sudah terdaftar. Coba masuk saja.')
    }

    writeJson(ACCOUNTS_KEY, [...accounts, toStoredAccount(user, password)])
  }

  async readSession(): Promise<string | null> {
    try {
      return window.localStorage.getItem(SESSION_KEY)
    } catch {
      return null
    }
  }

  async writeSession(userId: string | null): Promise<void> {
    try {
      if (userId) {
        window.localStorage.setItem(SESSION_KEY, userId)
        return
      }

      window.localStorage.removeItem(SESSION_KEY)
    } catch {
      // Diabaikan: aplikasi tetap bisa dipakai tanpa penyimpanan sesi.
    }
  }

  private readAccounts(): StoredAccount[] {
    return readJson<StoredAccount[]>(ACCOUNTS_KEY, [])
  }

  /** Mengisi akun contoh hanya bila penyimpanan masih kosong. */
  private seedDemoAccounts(): void {
    const accounts = this.readAccounts()

    if (accounts.length > 0) {
      return
    }

    writeJson(
      ACCOUNTS_KEY,
      DEMO_ACCOUNTS.map((account) => toStoredAccount(account.user, account.password)),
    )
  }
}
