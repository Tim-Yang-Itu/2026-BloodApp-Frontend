import { LayoutDashboard, MapPin, Ticket } from 'lucide-react'

import { initialsOf, useAuth } from '@/features/auth'
import { DashboardLayout } from '@/shared/ui'
import type { DashboardNavItem } from '@/shared/ui'

const NAV_ITEMS: readonly DashboardNavItem[] = [
  { to: '/dashboard-pendonor', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/jadwal-donor', label: 'Lokasi Donor', icon: MapPin },
  { to: '/tiket-saya', label: 'Tiket Saya', icon: Ticket },
]

/**
 * Layout area pendonor.
 *
 * Kerangka visual (sidebar, drawer layar kecil, footer) berasal dari
 * `DashboardLayout` sehingga identik dengan area UTD dan Admin RS.
 */
export function DonorLayout() {
  const { user, logout } = useAuth()

  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      navLabel="Navigasi pendonor"
      onLogout={() => void logout()}
      sidebarId="donor-sidebar"
      user={{
        name: user?.profile.fullName ?? 'Pendonor',
        detail: user?.email ?? 'Akun demo',
        initials: user ? initialsOf(user.profile.fullName) : 'PD',
      }}
    />
  )
}
