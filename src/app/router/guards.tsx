import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import type { UserRole } from '@/domain/enums/user'
import { FullPageLoader } from '@/presentation/components/shared/FullPageLoader'
import { useAuth } from '@/presentation/hooks/use-auth'
import { ROUTES } from '@/shared/constants/routes'

/** Rute yang hanya boleh diakses pengguna yang sudah login. */
export const RequireAuth = ({ children }: { readonly children: ReactNode }) => {
  const { status, user } = useAuth()
  const location = useLocation()

  if (status === 'loading') {
    return <FullPageLoader label="Memeriksa sesi Anda…" />
  }

  if (!user) {
    return <Navigate to={ROUTES.login} replace state={{ from: location.pathname }} />
  }

  return <>{children}</>
}

interface RequireRoleProps {
  readonly roles: readonly UserRole[]
  readonly children: ReactNode
}

/**
 * Rute yang dibatasi per peran — PRD §2 (data dipisah per fasilitas).
 * Pengguna dengan peran lain diarahkan ke halaman 403, bukan ke login.
 */
export const RequireRole = ({ roles, children }: RequireRoleProps) => {
  const { status, user } = useAuth()
  const location = useLocation()

  if (status === 'loading') {
    return <FullPageLoader label="Memeriksa hak akses…" />
  }

  if (!user) {
    return <Navigate to={ROUTES.login} replace state={{ from: location.pathname }} />
  }

  if (!roles.includes(user.role)) {
    return <Navigate to={ROUTES.forbidden} replace />
  }

  return <>{children}</>
}
