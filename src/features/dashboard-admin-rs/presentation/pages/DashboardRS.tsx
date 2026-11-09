import { useState } from 'react'

import { DashboardHeader } from '../components/DashboardHeader'
import { Sidebar } from '../components/Sidebar'
import { DashboardOverview } from './DashboardOverview'
import { RequestsPage } from './RequestsPage'
import { StockPage } from './StockPage'
import type { DashboardTab } from '../types'

export function DashboardRS() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex bg-surface-sunken">
      <Sidebar activeTab={activeTab} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={setActiveTab} />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader onOpenMenu={() => setIsSidebarOpen(true)} />
        <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10">
          {activeTab === 'dashboard' ? <DashboardOverview onNavigate={setActiveTab} /> : null}
          {activeTab === 'stock' ? <StockPage /> : null}
          {activeTab === 'requests' ? <RequestsPage /> : null}
        </main>
      </div>
    </div>
  )
}

export default DashboardRS
