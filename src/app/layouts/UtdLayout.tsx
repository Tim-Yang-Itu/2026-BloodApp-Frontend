import { BriefcaseMedical, Droplet, LayoutDashboard } from 'lucide-react'

import { initialsOf, useAuth } from '@/features/auth'
import { DashboardLayout } from '@/shared/ui'
import type { DashboardNavItem } from '@/shared/ui'

const NAV_ITEMS: readonly DashboardNavItem[] = [
  { to: '/utd', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/utd/stok', label: 'Stok Darah', icon: Droplet },
  { to: '/utd/permintaan', label: 'Permintaan RS', icon: BriefcaseMedical },
]

/**
 * Layout area UTD.
 *
 * Kerangka visual (sidebar, drawer layar kecil, footer) berasal dari
 * `DashboardLayout` sehingga identik dengan area pendonor dan Admin RS.
 */
export function UtdLayout() {
  const { user, logout } = useAuth()

  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      navLabel="Navigasi UTD"
      onLogout={() => void logout()}
      sidebarId="utd-sidebar"
      user={{
        name: user?.profile.fullName ?? 'Admin UTD',
        detail: 'PMI',
        initials: user ? initialsOf(user.profile.fullName) : 'UTD',
      }}
    />
  )
}
