import { useContext } from 'react'
import type { AuthContextValue } from '@/presentation/contexts/auth-context'
import { AuthContext } from '@/presentation/contexts/auth-context'

/** Mengakses state & aksi autentikasi dari komponen mana pun. */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth harus dipakai di dalam <AuthProvider>.')
  }

  return context
}
