import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import type { LoginInput, RegisterDonorInput } from '../../application/dto/auth.dto'
import type { AuthUser } from '../../domain/entities/user'
import { AuthContext } from './auth-context'
import type { AuthContextValue, AuthUseCases } from './auth-context'

type AuthProviderProps = {
  /** Hasil `createAuthModule()` dari `src/app/container.ts`. */
  useCases: AuthUseCases
  children: ReactNode
}

/**
 * Menyimpan pengguna yang sedang login selama aplikasi hidup.
 * Sesi sebenarnya dipulihkan dari repository lewat `restoreSession`,
 * sehingga halaman tidak perlu tahu cara penyimpanannya.
 */
export function AuthProvider({ useCases, children }: AuthProviderProps) {
  const { login, registerDonor, logout, restoreSession } = useCases
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let isActive = true

    restoreSession()
      .then((restored) => {
        if (!isActive) {
          return
        }

        setUser(restored)
        setIsReady(true)
      })
      .catch(() => {
        if (!isActive) {
          return
        }

        setUser(null)
        setIsReady(true)
      })

    return () => {
      isActive = false
    }
  }, [restoreSession])

  const signIn = useCallback(
    async (input: LoginInput) => {
      const signedIn = await login(input)
      setUser(signedIn)
      return signedIn
    },
    [login],
  )

  const signUp = useCallback(
    async (input: RegisterDonorInput) => {
      const created = await registerDonor(input)
      setUser(created)
      return created
    },
    [registerDonor],
  )

  const signOut = useCallback(async () => {
    await logout()
    setUser(null)
  }, [logout])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      login: signIn,
      registerDonor: signUp,
      logout: signOut,
      restoreSession,
    }),
    [user, isReady, signIn, signUp, signOut, restoreSession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
