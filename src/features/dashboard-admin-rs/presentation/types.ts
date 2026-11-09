import type { LucideIcon } from 'lucide-react'

export type DashboardTab = 'dashboard' | 'stock' | 'requests'

export type BloodStock = {
  type: string
  amount: number
  status: string
  statusClass: string
  barClass: string
}

export type BloodRequest = {
  id: string
  patient: string
  blood: string
  amount: string
  status: string
  date: string
}

export type NavItem = {
  id: DashboardTab
  label: string
  icon: LucideIcon
}
