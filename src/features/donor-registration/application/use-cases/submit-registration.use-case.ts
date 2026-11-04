import type { RegistrationDto, SubmitRegistrationInput } from '../dto/donor-registration.dto'
import type { DonorRegistration } from '../../domain/entities/donor-registration'
import { RegistrationError } from '../../domain/errors/registration-error'
import type { DonorRegistrationRepository } from '../../domain/repositories/donor-registration-repository'
import { createBookingCode } from '../../domain/rules/booking-code'
import { isScreeningComplete, passedScreening } from '../../domain/rules/screening'
import { toRegistrationDto } from '../mappers/registration-mapper'

export type SubmitRegistration = (input: SubmitRegistrationInput) => Promise<RegistrationDto>

const NIK_LENGTH = 16

function createRegistrationId(): string {
  return `reg_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`
}

function randomSequence(): number {
  return Math.floor(Math.random() * 9000) + 1000
}

/**
 * PDN-05 / PDN-06: menyimpan form donor + jawaban screening.
 * Hasil screening hanya penilaian awal; pemeriksaan ulang tetap di lokasi.
 */
export function createSubmitRegistrationUseCase(
  repository: DonorRegistrationRepository,
): SubmitRegistration {
  return async (input) => {
    const { identity } = input

    if (!input.locationName || !input.date || !input.time) {
      throw new RegistrationError('invalid-input', 'Pilih jadwal donor terlebih dahulu.')
    }

    if (
      !identity.fullName.trim() ||
      !identity.birthDate ||
      !identity.address.trim() ||
      !identity.phone.trim()
    ) {
      throw new RegistrationError(
        'invalid-input',
        'Lengkapi nama, tanggal lahir, alamat, dan nomor HP.',
      )
    }

    if (identity.nik.replace(/\D/g, '').length !== NIK_LENGTH) {
      throw new RegistrationError('invalid-input', 'Nomor KTP (NIK) harus 16 digit.')
    }

    if (!Number.isFinite(identity.weightKg) || identity.weightKg <= 0) {
      throw new RegistrationError('invalid-input', 'Isi berat badan dalam kilogram.')
    }

    if (!isScreeningComplete(input.screening, identity.gender)) {
      throw new RegistrationError(
        'incomplete-screening',
        'Masih ada pertanyaan screening yang belum dijawab.',
      )
    }

    const registration: DonorRegistration = {
      id: createRegistrationId(),
      bookingCode: createBookingCode(input.date, randomSequence()),
      userId: input.userId,
      locationId: input.locationId,
      locationName: input.locationName,
      locationAddress: input.locationAddress,
      date: input.date,
      time: input.time,
      status: 'scheduled',
      passedScreening: passedScreening(input.screening, identity.gender),
      identity: {
        ...identity,
        fullName: identity.fullName.trim(),
        address: identity.address.trim(),
        phone: identity.phone.trim(),
        occupation: identity.occupation.trim(),
        nik: identity.nik.replace(/\D/g, ''),
        emergencyContactName: identity.emergencyContactName.trim(),
        emergencyContactPhone: identity.emergencyContactPhone.trim(),
      },
      createdAt: new Date().toISOString(),
    }

    await repository.create(registration)

    return toRegistrationDto(registration)
  }
}
