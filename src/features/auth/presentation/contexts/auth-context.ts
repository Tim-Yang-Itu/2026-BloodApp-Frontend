import { createContext, useContext } from 'react'

import type { AuthUser } from '../../domain/entities/user'
import type { Login } from '../../application/use-cases/login.use-case'
import type { Logout } from '../../application/use-cases/logout.use-case'
import type { RegisterDonor } from '../../application/use-cases/register-donor.use-case'
import type { RestoreSession } from '../../application/use-cases/restore-session.use-case'

/** Use case fitur `auth` yang dibagikan ke seluruh aplikasi. */
export type AuthUseCases = {
  login: Login
  registerDonor: RegisterDonor
  logout: Logout
  restoreSession: RestoreSession
}

export type AuthContextValue = AuthUseCases & {
  user: AuthUser | null
  /** `false` selama sesi tersimpan masih dipulihkan. */
  isReady: boolean
  /** Tanggal kalender hari ini dari port `Clock` fitur `auth`. */
  today: string
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuthContext(): AuthContextValue {
  const value = useContext(AuthContext)

  if (!value) {
    throw new Error('useAuthContext harus dipakai di dalam <AuthProvider>.')
  }

  return value
}
