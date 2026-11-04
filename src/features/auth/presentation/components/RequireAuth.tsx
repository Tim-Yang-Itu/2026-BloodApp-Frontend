import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuthContext } from '../contexts/auth-context'

type RequireAuthProps = {
  children: ReactNode
}

/**
 * Penjaga rute yang hanya boleh dibuka pengguna yang sudah masuk.
 * Tujuan awal disimpan di query `redirect` agar setelah login pengguna
 * kembali ke halaman yang tadi ingin dibuka.
 */
export function RequireAuth({ children }: RequireAuthProps) {
  const { user, isReady } = useAuthContext()
  const location = useLocation()

  if (!isReady) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface-sunken">
        <p className="m-0 text-sm text-muted">Memeriksa sesi…</p>
      </div>
    )
  }

  if (!user) {
    const redirect = `${location.pathname}${location.search}`
    return <Navigate replace to={`/login?redirect=${encodeURIComponent(redirect)}`} />
  }

  return <>{children}</>
}
