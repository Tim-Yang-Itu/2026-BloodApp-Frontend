import type { LoginInput, AuthenticatedUser } from '@/application/dto/auth.dto'
import { toAuthenticatedUser } from '@/application/dto/auth.dto'
import type { TokenStorage } from '@/application/ports/token-storage-port'
import { hasFieldErrors, validateLoginInput } from '@/application/use-cases/auth/auth-validation'
import { AppError } from '@/domain/errors/app-error'
import type { AuthRepository } from '@/domain/repositories/auth-repository'

/**
 * Use case login untuk tiga peran (AU-01, AR-01, PD-03).
 * Menyimpan token sesi setelah kredensial valid.
 */
export class LoginUseCase {
  private readonly authRepository: AuthRepository
  private readonly tokenStorage: TokenStorage

  constructor(authRepository: AuthRepository, tokenStorage: TokenStorage) {
    this.authRepository = authRepository
    this.tokenStorage = tokenStorage
  }

  async execute(input: LoginInput): Promise<AuthenticatedUser> {
    const fieldErrors = validateLoginInput(input)
    if (hasFieldErrors(fieldErrors)) {
      throw new AppError(
        'validation_failed',
        'Periksa kembali email dan kata sandi Anda.',
        fieldErrors,
      )
    }

    const session = await this.authRepository.login({
      email: input.email.trim().toLowerCase(),
      password: input.password,
    })

    this.tokenStorage.set(session.token)
    return toAuthenticatedUser(session.user)
  }
}
