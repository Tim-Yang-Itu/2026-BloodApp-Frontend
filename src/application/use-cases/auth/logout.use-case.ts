import type { TokenStorage } from '@/application/ports/token-storage-port'
import type { AuthRepository } from '@/domain/repositories/auth-repository'

/**
 * Use case logout. Token lokal selalu dihapus lebih dahulu agar UI langsung
 * keluar walau permintaan ke server gagal.
 */
export class LogoutUseCase {
  private readonly authRepository: AuthRepository
  private readonly tokenStorage: TokenStorage

  constructor(authRepository: AuthRepository, tokenStorage: TokenStorage) {
    this.authRepository = authRepository
    this.tokenStorage = tokenStorage
  }

  async execute(): Promise<void> {
    const token = this.tokenStorage.get()
    this.tokenStorage.set(null)

    if (!token) return

    try {
      await this.authRepository.logout(token)
    } catch {
      // bersifat best effort: sesi lokal sudah dihapus
    }
  }
}
