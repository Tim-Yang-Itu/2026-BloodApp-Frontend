import type { RegistrationDto } from '../dto/donor-registration.dto'
import type { DonorRegistrationRepository } from '../../domain/repositories/donor-registration-repository'
import { toRegistrationDto } from '../mappers/registration-mapper'

export type ListRegistrations = (userId: string) => Promise<RegistrationDto[]>

/** Daftar pendaftaran milik satu pendonor, terbaru lebih dulu. */
export function createListRegistrationsUseCase(
  repository: DonorRegistrationRepository,
): ListRegistrations {
  return async (userId) => {
    const registrations = await repository.listByUser(userId)

    return registrations
      .slice()
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .map(toRegistrationDto)
  }
}
