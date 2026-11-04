import { useAuthContext } from '../contexts/auth-context'
import type { AuthContextValue } from '../contexts/auth-context'

/**
 * Hook publik fitur `auth`.
 * Mengembalikan pengguna aktif beserta aksi login/registrasi/logout.
 */
export function useAuth(): AuthContextValue {
  return useAuthContext()
}
