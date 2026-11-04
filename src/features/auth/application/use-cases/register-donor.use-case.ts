import { AuthError } from '../../domain/errors/auth-error'
import type { AuthUser } from '../../domain/entities/user'
import type { AuthRepository } from '../../domain/repositories/auth-repository'
import type { RegisterDonorInput } from '../dto/auth.dto'

export type RegisterDonor = (input: RegisterDonorInput) => Promise<AuthUser>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 8

function createUserId(): string {
  return `usr_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`
}

/**
 * PDN-04: membuat akun pendonor.
 * Akun langsung dipakai untuk sesi berjalan agar pengguna tidak perlu login dua kali.
 */
export function createRegisterDonorUseCase(repository: AuthRepository): RegisterDonor {
  return async (input) => {
    const fullName = input.fullName.trim()
    const email = input.email.trim().toLowerCase()
    const phone = input.phone.trim()

    if (!fullName || !email || !phone || !input.birthDate) {
      throw new AuthError('invalid-input', 'Lengkapi nama, email, nomor HP, dan tanggal lahir.')
    }

    if (!EMAIL_PATTERN.test(email)) {
      throw new AuthError('invalid-input', 'Format email belum benar.')
    }

    if (input.password.length < MIN_PASSWORD_LENGTH) {
      throw new AuthError(
        'invalid-input',
        `Password minimal ${MIN_PASSWORD_LENGTH} karakter.`,
      )
    }

    const existing = await repository.findByEmail(email)

    if (existing) {
      throw new AuthError('email-taken', 'Email ini sudah terdaftar. Coba masuk saja.')
    }

    const user: AuthUser = {
      id: createUserId(),
      email,
      role: 'donor',
      profile: {
        fullName,
        phone,
        birthDate: input.birthDate,
        gender: input.gender,
        bloodType: input.bloodType,
        rhesus: input.rhesus,
      },
      createdAt: new Date().toISOString(),
    }

    await repository.create(user, input.password)
    await repository.writeSession(user.id)

    return user
  }
}
