import { useState } from 'react'

import { useAuth } from '@/features/auth'
import { useBloodRequests } from '@/features/blood-request'

import { HospitalHeader } from './components/HospitalHeader'
import { HospitalSidebar } from './components/HospitalSidebar'
import { HOSPITAL_NAV_ITEMS } from './navigation'
import { HospitalOverviewSection } from './sections/HospitalOverviewSection'
import { HospitalRequestsSection } from './sections/HospitalRequestsSection'
import { HospitalStockSection } from './sections/HospitalStockSection'
import type { HospitalTab } from './types'

type HospitalDashboardPageProps = {
  /** Mengakhiri sesi pengguna lalu kembali ke halaman masuk. */
  onLogout: () => void
}

/**
 * RS-01: dashboard Admin RS.
 *
 * Halaman gabungan `blood-stock` (RS-02) dan `blood-request` (RS-03, RS-04, RS-06),
 * sehingga — sesuai `docs/ARCHITECTURE.md` §1 — diletakkan di `src/app/pages/hospital`
 * alih-alih menjadi fitur tersendiri.
 */
export function HospitalDashboardPage({ onLogout }: HospitalDashboardPageProps) {
  const { user } = useAuth()
  const { requests } = useBloodRequests()
  const [activeTab, setActiveTab] = useState<HospitalTab>('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const adminName = user?.profile.fullName ?? 'Admin RS'
  const pendingCount = requests.filter((request) => request.status === 'pending').length
  const activeLabel = HOSPITAL_NAV_ITEMS.find((item) => item.id === activeTab)?.label ?? 'Dashboard'

  return (
    <div className="flex min-h-screen bg-surface-sunken">
      <HospitalSidebar
        activeTab={activeTab}
        adminName={adminName}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={onLogout}
        onNavigate={setActiveTab}
        pendingCount={pendingCount}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <HospitalHeader
          adminName={adminName}
          onOpenMenu={() => setIsSidebarOpen(true)}
          title={activeLabel}
        />

        <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10">
          {activeTab === 'overview' ? (
            <HospitalOverviewSection adminName={adminName} onNavigate={setActiveTab} />
          ) : null}
          {activeTab === 'stock' ? <HospitalStockSection /> : null}
          {activeTab === 'requests' ? <HospitalRequestsSection /> : null}
        </main>
      </div>
    </div>
  )
}
