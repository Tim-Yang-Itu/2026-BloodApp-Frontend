/** Golongan darah ABO. */
export const BLOOD_GROUPS = ['A', 'B', 'AB', 'O'] as const

export type BloodGroup = (typeof BLOOD_GROUPS)[number]

/** Rhesus (faktor Rh). */
export const RHESUS_TYPES = ['positive', 'negative'] as const

export type Rhesus = (typeof RHESUS_TYPES)[number]

/** Komponen darah yang dapat diminta RS (PRD AR-02). */
export const BLOOD_COMPONENTS = ['whole_blood', 'prc', 'ffp', 'trombosit'] as const

export type BloodComponent = (typeof BLOOD_COMPONENTS)[number]

/**
 * Status uji kantong — EX-01.
 * Hanya kantong `passed` yang dihitung sebagai stok tersedia; `reactive` diblokir.
 */
export const BLOOD_TEST_STATUSES = ['untested', 'passed', 'reactive'] as const

export type BloodTestStatus = (typeof BLOOD_TEST_STATUSES)[number]

/**
 * Siklus hidup kantong darah — PRD §6 "Alur Status".
 * untested -> passed/available -> allocated -> delivered, cabang expired & blocked.
 */
export const BLOOD_BAG_STATUSES = [
  'untested',
  'available',
  'allocated',
  'delivered',
  'expired',
  'blocked',
] as const

export type BloodBagStatus = (typeof BLOOD_BAG_STATUSES)[number]

/** Tingkat stok sederhana di landing page — EX-05. */
export const STOCK_LEVELS = ['safe', 'low', 'critical'] as const

export type StockLevel = (typeof STOCK_LEVELS)[number]

/** Kondisi kedaluwarsa kantong untuk notifikasi — AU-03. */
export const EXPIRY_STATUSES = ['valid', 'near_expiry', 'expired'] as const

export type ExpiryStatus = (typeof EXPIRY_STATUSES)[number]
