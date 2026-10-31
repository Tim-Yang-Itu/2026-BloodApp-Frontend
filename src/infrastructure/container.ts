/**
 * Composition root sederhana: satu-satunya tempat yang memilih implementasi
 * konkret untuk kontrak domain/application.
 *
 * Aplikasi ini adalah mode tampilan (tanpa backend), sehingga `AuthRepository`
 * hanya punya satu implementasi: repository demo berbasis `sessionStorage`.
 * Bila backend tersedia nanti, cukup tambahkan implementasi HTTP di sini.
 *
 * Komponen UI cukup memakai `container.authUseCases`.
 */
import {
  LoginUseCase,
  LogoutUseCase,
  RegisterDonorUseCase,
  RestoreSessionUseCase,
} from '@/application/use-cases/auth'
import type { AuthRepository } from '@/domain/repositories/auth-repository'
import { createInMemoryAuthRepository } from '@/infrastructure/repositories/in-memory-auth-repository'
import { createSessionTokenStorage } from '@/infrastructure/storage/session-token-storage'

const tokenStorage = createSessionTokenStorage()

/** Satu-satunya sumber data autentikasi (data demo, bukan database). */
const authRepository: AuthRepository = createInMemoryAuthRepository()

export const container = {
  authRepository,
  tokenStorage,
  authUseCases: {
    login: new LoginUseCase(authRepository, tokenStorage),
    logout: new LogoutUseCase(authRepository, tokenStorage),
    registerDonor: new RegisterDonorUseCase(authRepository, tokenStorage),
    restoreSession: new RestoreSessionUseCase(authRepository, tokenStorage),
  },
} as const
