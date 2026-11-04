import type { RegistrationDto } from '../dto/donor-registration.dto'
import type { DonorRegistrationRepository } from '../../domain/repositories/donor-registration-repository'
import { toRegistrationDto } from '../mappers/registration-mapper'

export type GetRegistration = (bookingCode: string) => Promise<RegistrationDto | null>

/** Detail tiket berdasarkan kode booking (dipakai halaman tiket & scan petugas). */
export function createGetRegistrationUseCase(
  repository: DonorRegistrationRepository,
): GetRegistration {
  return async (bookingCode) => {
    const normalized = bookingCode.trim().toUpperCase()

    if (!normalized) {
      return null
    }

    const registration = await repository.findByCode(normalized)

    return registration ? toRegistrationDto(registration) : null
  }
}
