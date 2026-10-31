import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type {
  AuthenticatedUser,
  LoginInput,
  RegisterDonorInput,
} from '@/application/dto/auth.dto'
import { container } from '@/infrastructure'
import { DEMO_ACCOUNTS } from '@/infrastructure/repositories/in-memory-auth-repository'
import type {
  AuthContextValue,
  AuthStatus,
  DemoAccount,
} from '@/presentation/contexts/auth-context'
import { AuthContext } from '@/presentation/contexts/auth-context'

/** Akun demo selalu ditampilkan karena aplikasi berjalan tanpa backend. */
const demoAccounts: readonly DemoAccount[] = DEMO_ACCOUNTS

/**
 * Menyediakan state autentikasi ke seluruh UI.
 * Satu-satunya komponen presentasi yang memanggil use case secara langsung
 * lewat composition root (`container`).
 */
export const AuthProvider = ({ children }: { readonly children: ReactNode }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null)
  const [status, setStatus] = useState<AuthStatus>('loading')

  useEffect(() => {
    let isActive = true

    container.authUseCases.restoreSession
      .execute()
      .then((restoredUser) => {
        if (!isActive) return
        setUser(restoredUser)
        setStatus(restoredUser ? 'authenticated' : 'unauthenticated')
      })
      .catch(() => {
        if (!isActive) return
        setUser(null)
        setStatus('unauthenticated')
      })

    return () => {
      isActive = false
    }
  }, [])

  const login = useCallback(async (input: LoginInput): Promise<AuthenticatedUser> => {
    const authenticatedUser = await container.authUseCases.login.execute(input)
    setUser(authenticatedUser)
    setStatus('authenticated')
    return authenticatedUser
  }, [])

  const registerDonor = useCallback(
    async (input: RegisterDonorInput): Promise<AuthenticatedUser> => {
      const authenticatedUser = await container.authUseCases.registerDonor.execute(input)
      setUser(authenticatedUser)
      setStatus('authenticated')
      return authenticatedUser
    },
    [],
  )

  const logout = useCallback(async (): Promise<void> => {
    await container.authUseCases.logout.execute()
    setUser(null)
    setStatus('unauthenticated')
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, demoAccounts, login, registerDonor, logout }),
    [status, user, login, registerDonor, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
