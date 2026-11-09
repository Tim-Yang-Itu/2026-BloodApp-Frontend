import { Droplet, LayoutDashboard, Package } from 'lucide-react'

import { ROUTES } from '@/shared/constants/routes'

import type { HospitalNavItem, HospitalTab } from './types'

/**
 * Navigasi utama area Admin RS.
 * Setiap tab adalah rute sungguhan (bukan state lokal) agar halaman bisa
 * di-bookmark, di-refresh, dan dibuka langsung dari tautan.
 */
export const HOSPITAL_NAV_ITEMS: readonly HospitalNavItem[] = [
  { id: 'overview', label: 'Dashboard', to: ROUTES.hospitalDashboard, icon: LayoutDashboard },
  { id: 'stock', label: 'Stok Darah', to: ROUTES.hospitalStock, icon: Droplet },
  { id: 'requests', label: 'Permintaan Darah', to: ROUTES.hospitalRequests, icon: Package },
]

/** Rute tujuan sebuah tab. */
export function hospitalPathOf(tab: HospitalTab): string {
  return HOSPITAL_NAV_ITEMS.find((item) => item.id === tab)?.to ?? ROUTES.hospitalDashboard
}

/** Item navigasi yang cocok dengan pathname aktif (fallback: Dashboard). */
export function hospitalNavItemOf(pathname: string): HospitalNavItem {
  return HOSPITAL_NAV_ITEMS.find((item) => item.to === pathname) ?? HOSPITAL_NAV_ITEMS[0]
}
