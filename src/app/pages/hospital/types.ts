import type { LucideIcon } from 'lucide-react'

/** Tab navigasi di area Admin RS (RS-02, RS-03, RS-04, RS-06). */
export type HospitalTab = 'overview' | 'stock' | 'requests'

export type HospitalNavItem = {
  id: HospitalTab
  label: string
  icon: LucideIcon
}
