import type { AuthUser } from '../../domain/entities/user'
import type { AuthRepository } from '../../domain/repositories/auth-repository'

export type RestoreSession = () => Promise<AuthUser | null>

/**
 * Memulihkan sesi saat aplikasi dibuka.
 * Bila akun pada sesi sudah tidak ada, sesi dibersihkan agar tidak menggantung.
 */
export function createRestoreSessionUseCase(repository: AuthRepository): RestoreSession {
  return async () => {
    const userId = await repository.readSession()

    if (!userId) {
      return null
    }

    const user = await repository.findById(userId)

    if (!user) {
      await repository.writeSession(null)
      return null
    }

    return user
  }
}
