import { Droplets, LayoutDashboard, Package } from 'lucide-react'

import type { BloodRequest, BloodStock, NavItem } from './types'

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'stock', label: 'Stok Darah', icon: Droplets },
  { id: 'requests', label: 'Permintaan Saya', icon: Package },
]

export const BLOOD_STOCK: BloodStock[] = [
  { type: 'A+', amount: 24, status: 'Aman', statusClass: 'text-success', barClass: 'bg-success' },
  { type: 'B+', amount: 18, status: 'Aman', statusClass: 'text-success', barClass: 'bg-success' },
  { type: 'O+', amount: 9, status: 'Menipis', statusClass: 'text-warning', barClass: 'bg-warning' },
  { type: 'AB+', amount: 5, status: 'Kritis', statusClass: 'text-danger', barClass: 'bg-danger' },
]

export const REQUESTS: BloodRequest[] = [
  { id: 'REQ-24091', patient: 'Budi Santoso', blood: 'O+', amount: '2 kantong', status: 'Menunggu', date: 'Hari ini, 09:42' },
  { id: 'REQ-24088', patient: 'Siti Aminah', blood: 'A+', amount: '1 kantong', status: 'Diproses', date: 'Kemarin, 14:20' },
  { id: 'REQ-24074', patient: 'Andi Wijaya', blood: 'B+', amount: '3 kantong', status: 'Selesai', date: '12 Mei 2026' },
]

export const STATUS_STYLES: Record<string, string> = {
  Menunggu: 'bg-warning/10 text-warning',
  Diproses: 'bg-primary-50 text-primary',
  Selesai: 'bg-success/10 text-success',
}
