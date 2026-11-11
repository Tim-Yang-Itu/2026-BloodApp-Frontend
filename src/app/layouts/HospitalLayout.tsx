import { useMemo } from 'react'

import { initialsOf, useAuth } from '@/features/auth'
import { DashboardLayout } from '@/shared/ui'

import { HOSPITAL_NAV_ITEMS } from '../pages/hospital/navigation'
import { useHospitalRequests } from '../pages/hospital/use-hospital-requests'

/**
 * Layout area Admin RS.
 *
 * Kerangka visual (sidebar, drawer layar kecil, footer) berasal dari
 * `DashboardLayout` sehingga identik dengan area pendonor dan UTD. Yang
 * tersisa di sini hanya navigasi RS dan lencana jumlah permintaan menunggu.
 */
export function HospitalLayout() {
  const { user, logout } = useAuth()
  const { requests, hospitalName } = useHospitalRequests()

  const pendingCount = requests.filter((request) => request.status === 'pending').length

  const navItems = useMemo(
    () =>
      HOSPITAL_NAV_ITEMS.map((item) => ({
        to: item.to,
        label: item.label,
        icon: item.icon,
        end: item.to === HOSPITAL_NAV_ITEMS[0].to,
        badge: item.id === 'requests' ? pendingCount : undefined,
      })),
    [pendingCount],
  )

  return (
    <DashboardLayout
      navItems={navItems}
      navLabel="Navigasi Admin RS"
      onLogout={() => void logout()}
      sidebarId="hospital-sidebar"
      user={{
        name: user?.profile.fullName ?? 'Admin RS',
        detail: hospitalName ?? 'Admin Rumah Sakit',
        initials: user ? initialsOf(user.profile.fullName) : 'RS',
      }}
    />
  )
}
