import type { StatusTone } from '@/shared/types/status-tone'

import type { BloodBagStatus } from '../entities/blood-bag'

export const BLOOD_BAG_STATUS_LABEL: Record<BloodBagStatus, string> = {
  available: 'Tersedia',
  reserved: 'Dipesan',
  used: 'Terpakai',
  expired: 'Expired',
}

export const BLOOD_BAG_STATUS_TONE: Record<BloodBagStatus, StatusTone> = {
  available: 'success',
  reserved: 'info',
  used: 'neutral',
  expired: 'danger',
}
