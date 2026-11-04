/**
 * Public API fitur `donor-registration`.
 *
 * Cakupan PRD:
 * - PDN-05 Form donor & screening kesehatan
 * - PDN-06 Tiket digital QR
 *
 * Fitur lain (mis. `donor-history`) hanya boleh memakai simbol yang diekspor di sini.
 */

export { createDonorRegistrationModule } from './infrastructure/container'
export type { DonorRegistrationModule } from './infrastructure/container'

export type {
  DonorIdentityInput,
  RegistrationDto,
  SubmitRegistrationInput,
} from './application/dto/donor-registration.dto'

export { DonorRegistrationProvider } from './presentation/contexts/DonorRegistrationProvider'
export {
  useRegistrationUseCases,
} from './presentation/contexts/registration-context'
export type { DonorRegistrationUseCases } from './presentation/contexts/registration-context'

export { useRegistrations } from './presentation/hooks/use-registrations'
export { useRegistration } from './presentation/hooks/use-registration'

export { DonorDashboardPage } from './presentation/pages/DonorDashboardPage'
export { DonorFormPage } from './presentation/pages/DonorFormPage'
export { DonorFormFlow } from './presentation/components/DonorFormFlow'
export { MyTicketsPage } from './presentation/pages/MyTicketsPage'
export { TicketDetailPage } from './presentation/pages/TicketDetailPage'
