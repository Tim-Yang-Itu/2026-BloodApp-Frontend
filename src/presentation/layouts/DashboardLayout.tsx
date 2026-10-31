import type { ReactNode } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '@/presentation/hooks/use-auth'
import { RoleBadge } from '@/presentation/components/shared/RoleBadge'
import { Button } from '@/presentation/components/ui'
import { APP_NAME } from '@/shared/constants/app'
import { ROUTES } from '@/shared/constants/routes'

interface DashboardLayoutProps {
  readonly title: string
  readonly description: string
  readonly children: ReactNode
}

/** Kerangka halaman portal setelah login (UTD/PMI, RS, Pendonor). */
export const DashboardLayout = ({ title, description, children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return <Navigate to={ROUTES.login} replace />
  }

  const handleLogout = async (): Promise<void> => {
    await logout()
    navigate(ROUTES.login, { replace: true })
  }

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__brand">
          <span className="brand__mark" aria-hidden="true">
            +
          </span>
          <div>
            <p className="dashboard__app">{APP_NAME}</p>
            <p className="dashboard__role">
              <RoleBadge role={user.role} />
            </p>
          </div>
        </div>

        <div className="dashboard__actions">
          <div className="user-badge">
            <span className="user-badge__name">{user.fullName}</span>
            <span className="user-badge__email">{user.email}</span>
          </div>
          <Button variant="secondary" onClick={handleLogout}>
            Keluar
          </Button>
        </div>
      </header>

      <main className="dashboard__main">
        <div className="page-heading">
          <h1 className="page-heading__title">{title}</h1>
          <p className="page-heading__description">{description}</p>
        </div>
        {children}
      </main>
    </div>
  )
}
