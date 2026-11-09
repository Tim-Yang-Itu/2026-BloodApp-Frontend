import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import type { UserRole } from '../../domain/entities/user'
import { roleHomePath } from '../../domain/rules/role-home'
import { useAuthContext } from '../contexts/auth-context'

type RequireRoleProps = {
  role: UserRole
  children: ReactNode
}

/**
 * Membatasi area rute pada satu peran.
 * Pengguna dengan peran lain dikembalikan ke beranda perannya sendiri agar
 * tidak terjebak pada halaman yang bukan hak aksesnya.
 */
export function RequireRole({ role, children }: RequireRoleProps) {
  const { user, isReady } = useAuthContext()

  if (!isReady) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface-sunken">
        <p className="m-0 text-sm text-muted">Memeriksa sesi…</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate replace to="/login" />
  }

  if (user.role !== role) {
    return <Navigate replace to={roleHomePath(user.role)} />
  }

  return <>{children}</>
}
