/** Kontrak data antara halaman auth dan use case. */

import type { BloodType, Gender, RhesusType } from '../../domain/entities/user'

export type LoginInput = {
  email: string
  password: string
}

export type RegisterDonorInput = {
  fullName: string
  email: string
  phone: string
  /** Tanggal kalender `yyyy-mm-dd`. */
  birthDate: string
  gender: Gender
  bloodType: BloodType | null
  rhesus: RhesusType | null
  password: string
}
