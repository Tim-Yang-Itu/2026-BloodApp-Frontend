import type { RegisterDonorInput, AuthenticatedUser } from '@/application/dto/auth.dto'
import { toAuthenticatedUser } from '@/application/dto/auth.dto'
import type { TokenStorage } from '@/application/ports/token-storage-port'
import {
  hasFieldErrors,
  normalizeNik,
  normalizePhone,
  validateRegisterDonorInput,
} from '@/application/use-cases/auth/auth-validation'
import { AppError } from '@/domain/errors/app-error'
import type { BloodGroup, Rhesus } from '@/domain/enums/blood'
import type { AuthRepository } from '@/domain/repositories/auth-repository'

/**
 * Use case registrasi pendonor — PD-03.
 * Validasi dilakukan di lapisan application agar UI tetap tipis.
 */
export class RegisterDonorUseCase {
  private readonly authRepository: AuthRepository
  private readonly tokenStorage: TokenStorage

  constructor(authRepository: AuthRepository, tokenStorage: TokenStorage) {
    this.authRepository = authRepository
    this.tokenStorage = tokenStorage
  }

  async execute(input: RegisterDonorInput): Promise<AuthenticatedUser> {
    const fieldErrors = validateRegisterDonorInput(input)
    if (hasFieldErrors(fieldErrors)) {
      throw new AppError(
        'validation_failed',
        'Periksa kembali data pendaftaran Anda.',
        fieldErrors,
      )
    }

    const address = input.address.trim()

    const session = await this.authRepository.registerDonor({
      fullName: input.fullName.trim(),
      email: input.email.trim().toLowerCase(),
      password: input.password,
      nik: normalizeNik(input.nik),
      bloodGroup: input.bloodGroup as BloodGroup,
      rhesus: input.rhesus as Rhesus,
      phone: normalizePhone(input.phone),
      address: address.length > 0 ? address : null,
    })

    this.tokenStorage.set(session.token)
    return toAuthenticatedUser(session.user)
  }
}
