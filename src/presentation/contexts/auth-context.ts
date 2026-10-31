import { createContext } from 'react'
import type {
  AuthenticatedUser,
  LoginInput,
  RegisterDonorInput,
} from '@/application/dto/auth.dto'

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

/** Akun demo yang hanya tersedia saat mode autentikasi `mock`. */
export interface DemoAccount {
  readonly role: string
  readonly email: string
  readonly password: string
}

/**
 * Kontrak state autentikasi untuk UI. Implementasi provider berada di
 * `app/providers/auth-provider.tsx` (composition root).
 */
export interface AuthContextValue {
  readonly status: AuthStatus
  readonly user: AuthenticatedUser | null
  readonly demoAccounts: readonly DemoAccount[]
  readonly login: (input: LoginInput) => Promise<AuthenticatedUser>
  readonly registerDonor: (input: RegisterDonorInput) => Promise<AuthenticatedUser>
  readonly logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
