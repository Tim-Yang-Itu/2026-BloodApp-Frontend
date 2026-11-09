import { Droplet, LayoutDashboard, Package } from 'lucide-react'

import type { HospitalNavItem } from './types'

export const HOSPITAL_NAV_ITEMS: readonly HospitalNavItem[] = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'stock', label: 'Stok Darah', icon: Droplet },
  { id: 'requests', label: 'Permintaan Darah', icon: Package },
]
