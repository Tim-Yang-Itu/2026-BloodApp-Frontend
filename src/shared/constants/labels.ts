import type {
  BloodBagStatus,
  BloodComponent,
  BloodGroup,
  BloodTestStatus,
  Rhesus,
  StockLevel,
} from '@/domain/enums/blood'
import type { BloodRequestStatus, RequestUrgency } from '@/domain/enums/blood-request'
import type { DonorRegistrationStatus } from '@/domain/enums/donor'
import type { UserRole } from '@/domain/enums/user'

/** Label peran untuk UI berbahasa Indonesia — PRD §2. */
export const USER_ROLE_LABELS: Record<UserRole, string> = {
  donor: 'Pendonor',
  utd_admin: 'Admin UTD/PMI',
  hospital_admin: 'Admin RS',
}

export const RHESUS_LABELS: Record<Rhesus, string> = {
  positive: 'Positif (+)',
  negative: 'Negatif (−)',
}

export const BLOOD_GROUP_LABELS: Record<BloodGroup, string> = {
  A: 'A',
  B: 'B',
  AB: 'AB',
  O: 'O',
}

export const BLOOD_COMPONENT_LABELS: Record<BloodComponent, string> = {
  whole_blood: 'Darah lengkap',
  prc: 'PRC',
  ffp: 'FFP',
  trombosit: 'Trombosit',
}

export const BLOOD_TEST_STATUS_LABELS: Record<BloodTestStatus, string> = {
  untested: 'Belum diuji',
  passed: 'Lolos uji',
  reactive: 'Reaktif',
}

export const BLOOD_BAG_STATUS_LABELS: Record<BloodBagStatus, string> = {
  untested: 'Belum diuji',
  available: 'Tersedia',
  allocated: 'Dialokasikan',
  delivered: 'Terkirim',
  expired: 'Kedaluwarsa',
  blocked: 'Diblokir',
}

export const STOCK_LEVEL_LABELS: Record<StockLevel, string> = {
  safe: 'Aman',
  low: 'Menipis',
  critical: 'Kritis',
}

export const BLOOD_REQUEST_STATUS_LABELS: Record<BloodRequestStatus, string> = {
  pending: 'Menunggu',
  approved: 'Disetujui',
  rejected: 'Ditolak',
  received: 'Diterima',
}

export const REQUEST_URGENCY_LABELS: Record<RequestUrgency, string> = {
  routine: 'Rutin',
  urgent: 'Mendesak',
  emergency: 'Gawat darurat',
}

export const DONOR_REGISTRATION_STATUS_LABELS: Record<DonorRegistrationStatus, string> = {
  registered: 'Terdaftar',
  checked_in: 'Sudah hadir',
  donated: 'Selesai donor',
  deferred: 'Ditunda',
  rejected: 'Tidak lolos',
  no_show: 'Tidak hadir',
}

/** Contoh: "O+", "AB−". */
export const formatBloodType = (group: BloodGroup, rhesus: Rhesus): string =>
  `${group}${rhesus === 'positive' ? '+' : '−'}`

