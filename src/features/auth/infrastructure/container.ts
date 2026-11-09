import { createLoginUseCase } from '../application/use-cases/login.use-case'
import { createLogoutUseCase } from '../application/use-cases/logout.use-case'
import { createRegisterDonorUseCase } from '../application/use-cases/register-donor.use-case'
import { createRestoreSessionUseCase } from '../application/use-cases/restore-session.use-case'
import { createSystemClock } from './clock/system-clock'
import { LocalStorageAuthRepository } from './repositories/local-storage-auth-repository'

/**
 * Perakitan dependensi fitur `auth`.
 * Dipanggil sekali dari `src/app/container.ts`, hasilnya dibagikan lewat
 * `AuthProvider` — presentation tidak menyusun dependensi sendiri.
 */
export function createAuthModule() {
  const repository = new LocalStorageAuthRepository()
  const clock = createSystemClock()

  return {
    /** Tanggal kalender hari ini; dipakai form sebagai batas tanggal lahir. */
    today: clock.today(),
    login: createLoginUseCase(repository),
    registerDonor: createRegisterDonorUseCase(repository, clock),
    logout: createLogoutUseCase(repository),
    restoreSession: createRestoreSessionUseCase(repository),
  }
}

export type AuthModule = ReturnType<typeof createAuthModule>
