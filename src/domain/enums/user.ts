/**
 * Peran dan jenis fasilitas — PRD §2 "Peran dan Akses".
 *
 * Catatan: proyek memakai `erasableSyntaxOnly`, jadi status/peran ditulis sebagai
 * union literal (bukan `enum` TypeScript).
 */
export const USER_ROLES = ['donor', 'utd_admin', 'hospital_admin'] as const

export type UserRole = (typeof USER_ROLES)[number]

export const FACILITY_TYPES = ['utd', 'hospital'] as const

export type FacilityType = (typeof FACILITY_TYPES)[number]
