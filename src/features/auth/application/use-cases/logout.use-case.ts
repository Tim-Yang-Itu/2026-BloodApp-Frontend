import type { AuthRepository } from '../../domain/repositories/auth-repository'

export type Logout = () => Promise<void>

/** Menghapus sesi pada perangkat ini. */
export function createLogoutUseCase(repository: AuthRepository): Logout {
  return async () => {
    await repository.writeSession(null)
  }
}
