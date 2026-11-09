import { createGetRegistrationUseCase } from '../application/use-cases/get-registration.use-case'
import { createListRegistrationsUseCase } from '../application/use-cases/list-registrations.use-case'
import { createSubmitRegistrationUseCase } from '../application/use-cases/submit-registration.use-case'
import { createSystemClock } from './clock/system-clock'
import { LocalStorageDonorRegistrationRepository } from './repositories/local-storage-donor-registration-repository'

/**
 * Perakitan dependensi fitur `donor-registration`.
 * Dipanggil sekali dari `src/app/container.ts`, hasilnya dibagikan ke halaman
 * lewat provider React.
 */
export function createDonorRegistrationModule() {
  const repository = new LocalStorageDonorRegistrationRepository()
  const clock = createSystemClock()

  return {
    /** Tanggal kalender hari ini; dipakai form sebagai batas tanggal lahir. */
    today: clock.today(),
    submitRegistration: createSubmitRegistrationUseCase(repository, clock),
    listRegistrations: createListRegistrationsUseCase(repository),
    getRegistration: createGetRegistrationUseCase(repository),
  }
}

export type DonorRegistrationModule = ReturnType<typeof createDonorRegistrationModule>
