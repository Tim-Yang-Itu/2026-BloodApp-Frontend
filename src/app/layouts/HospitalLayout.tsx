import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '@/features/auth'
import { useBloodRequests } from '@/features/blood-request'

import { HospitalHeader } from '../pages/hospital/components/HospitalHeader'
import { HospitalSidebar } from '../pages/hospital/components/HospitalSidebar'
import { hospitalNavItemOf } from '../pages/hospital/navigation'

/**
 * Layout area Admin RS.
 *
 * Sejajar dengan `UtdLayout` dan `DonorLayout`: sidebar + bilah atas dipasang
 * sekali, isi halaman datang dari `<Outlet />`. Navigasi memakai rute
 * (`/dashboard-rs`, `/dashboard-rs/stok`, `/dashboard-rs/permintaan`) sehingga
 * tidak ada tab yang hilang saat halaman dimuat ulang.
 */
export function HospitalLayout() {
  const { user, logout } = useAuth()
  const { requests } = useBloodRequests()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  const adminName = user?.profile.fullName ?? 'Admin RS'
  const pendingCount = requests.filter((request) => request.status === 'pending').length
  const activeItem = hospitalNavItemOf(location.pathname)

  return (
    <div className="flex min-h-screen bg-surface-sunken">
      <HospitalSidebar
        adminName={adminName}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={() => void logout()}
        pendingCount={pendingCount}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <HospitalHeader
          adminName={adminName}
          onOpenMenu={() => setIsSidebarOpen(true)}
          title={activeItem.label}
        />

        <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
