import type { AuthenticatedUser } from '@/application/dto/auth.dto'
import { toAuthenticatedUser } from '@/application/dto/auth.dto'
import type { TokenStorage } from '@/application/ports/token-storage-port'
import type { AuthRepository } from '@/domain/repositories/auth-repository'

/**
 * Memulihkan sesi saat aplikasi dimuat ulang: validasi token ke server.
 * Mengembalikan `null` bila token tidak ada/tidak valid, bukan melempar error.
 */
export class RestoreSessionUseCase {
  private readonly authRepository: AuthRepository
  private readonly tokenStorage: TokenStorage

  constructor(authRepository: AuthRepository, tokenStorage: TokenStorage) {
    this.authRepository = authRepository
    this.tokenStorage = tokenStorage
  }

  async execute(): Promise<AuthenticatedUser | null> {
    const token = this.tokenStorage.get()
    if (!token) return null

    try {
      const user = await this.authRepository.fetchCurrentUser(token)
      return toAuthenticatedUser(user)
    } catch {
      this.tokenStorage.set(null)
      return null
    }
  }
}
