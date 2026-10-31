import type { User } from '@/domain/entities/user'
import { AppError } from '@/domain/errors/app-error'
import type {
  AuthRepository,
  AuthSession,
  LoginCredentials,
  RegisterDonorPayload,
} from '@/domain/repositories/auth-repository'

/**
 * Repository autentikasi tiruan untuk pengembangan tanpa backend.
 *
 * Data disimpan di `sessionStorage` (bukan database) semata-mata agar alur
 * login/registrasi dapat dicoba. JANGAN dipakai di produksi.
 */

const ACCOUNTS_KEY = 'darahterpadu.mock.accounts'
const LATENCY_MS = 350
const DEMO_PASSWORD = 'Password123!'

interface MockAccount {
  readonly user: User
  readonly password: string
}

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

const toIso = (date: Date): string => date.toISOString()

const createUser = (
  id: string,
  email: string,
  fullName: string,
  role: User['role'],
  facilityId: string | null,
): User => {
  const now = toIso(new Date())
  return {
    id,
    email,
    fullName,
    role,
    facilityId,
    mfaEnabled: role !== 'donor',
    createdAt: now,
    updatedAt: now,
  }
}

/** Akun demo: satu untuk tiap peran di PRD §2. */
const seedAccounts = (): MockAccount[] => [
  {
    user: createUser('usr-utd-01', 'utd@darahterpadu.id', 'Siti Rahma', 'utd_admin', 'fac-utd-01'),
    password: DEMO_PASSWORD,
  },
  {
    user: createUser('usr-rs-01', 'rs@darahterpadu.id', 'Budi Santoso', 'hospital_admin', 'fac-rs-01'),
    password: DEMO_PASSWORD,
  },
  {
    user: createUser('usr-donor-01', 'donor@darahterpadu.id', 'Andi Pratama', 'donor', null),
    password: DEMO_PASSWORD,
  },
]

const readAccounts = (): MockAccount[] => {
  try {
    const raw = window.sessionStorage.getItem(ACCOUNTS_KEY)
    if (!raw) return seedAccounts()
    const parsed = JSON.parse(raw) as MockAccount[]
    return parsed.length > 0 ? parsed : seedAccounts()
  } catch {
    return seedAccounts()
  }
}

const writeAccounts = (accounts: MockAccount[]): void => {
  try {
    window.sessionStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
  } catch {
    // abaikan: mode penyimpanan tidak tersedia
  }
}

const tokenFor = (userId: string): string => `mock.${userId}`
const userIdFromToken = (token: string): string | null =>
  token.startsWith('mock.') ? token.slice('mock.'.length) : null

export const createInMemoryAuthRepository = (): AuthRepository => {
  const resolveSession = (account: MockAccount): AuthSession => ({
    token: tokenFor(account.user.id),
    user: account.user,
  })

  return {
    async login(credentials: LoginCredentials): Promise<AuthSession> {
      await delay(LATENCY_MS)
      const accounts = readAccounts()
      const account = accounts.find(
        (item) =>
          item.user.email.toLowerCase() === credentials.email.toLowerCase() &&
          item.password === credentials.password,
      )

      if (!account) {
        throw new AppError(
          'invalid_credentials',
          'Email atau kata sandi tidak sesuai. Coba akun demo yang tersedia.',
        )
      }

      return resolveSession(account)
    },

    async registerDonor(payload: RegisterDonorPayload): Promise<AuthSession> {
      await delay(LATENCY_MS)
      const accounts = readAccounts()
      const emailTaken = accounts.some(
        (item) => item.user.email.toLowerCase() === payload.email.toLowerCase(),
      )

      if (emailTaken) {
        throw new AppError('email_already_registered', 'Email sudah terdaftar.', {
          email: 'Email sudah terdaftar.',
        })
      }

      const user = createUser(
        `usr-${Math.random().toString(36).slice(2, 10)}`,
        payload.email,
        payload.fullName,
        'donor',
        null,
      )

      writeAccounts([...accounts, { user, password: payload.password }])
      return { token: tokenFor(user.id), user }
    },

    async fetchCurrentUser(token: string): Promise<User> {
      await delay(LATENCY_MS / 3)
      const userId = userIdFromToken(token)
      const account = readAccounts().find((item) => item.user.id === userId)

      if (!account) {
        throw new AppError('unauthorized', 'Sesi Anda telah berakhir. Silakan masuk kembali.')
      }

      return account.user
    },

    async logout(): Promise<void> {
      await delay(LATENCY_MS / 3)
    },
  }
}

/** Akun demo yang ditampilkan sebagai petunjuk pada halaman login. */
export const DEMO_ACCOUNTS = [
  { role: 'Admin UTD/PMI', email: 'utd@darahterpadu.id', password: DEMO_PASSWORD },
  { role: 'Admin RS', email: 'rs@darahterpadu.id', password: DEMO_PASSWORD },
  { role: 'Pendonor', email: 'donor@darahterpadu.id', password: DEMO_PASSWORD },
] as const
