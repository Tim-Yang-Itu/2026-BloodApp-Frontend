import { AuthError } from '../../domain/errors/auth-error'
import type { AuthUser } from '../../domain/entities/user'
import type { AuthRepository } from '../../domain/repositories/auth-repository'

export type LoginInput = {
  email: string
  password: string
}

export type Login = (input: LoginInput) => Promise<AuthUser>

/**
 * PDN-04 / UTD-01 / RS-01: masuk memakai email & password.
 * Sesi disimpan supaya pengguna tetap login setelah halaman dimuat ulang.
 */
export function createLoginUseCase(repository: AuthRepository): Login {
  return async (input) => {
    const email = input.email.trim().toLowerCase()

    if (!email || !input.password) {
      throw new AuthError('invalid-input', 'Email dan password wajib diisi.')
    }

    const user = await repository.authenticate({ email, password: input.password })

    if (!user) {
      throw new AuthError('invalid-credentials', 'Email atau password salah. Coba periksa lagi.')
    }

    await repository.writeSession(user.id)

    return user
  }
}
