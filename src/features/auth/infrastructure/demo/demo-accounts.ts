import type { AuthUser } from '../../domain/entities/user'

/**
 * Akun contoh yang ditanam saat pertama kali aplikasi dibuka.
 * Berguna untuk mencoba alur pendonor tanpa registrasi lebih dulu.
 */
export type DemoAccount = {
  user: AuthUser
  password: string
}

export const DEMO_ACCOUNTS: readonly DemoAccount[] = [
  {
    user: {
      id: 'usr_demo_nabila',
      email: 'nabila@donorku.id',
      role: 'donor',
      profile: {
        fullName: 'Nabila Firda Suryani',
        phone: '081234567890',
        birthDate: '2001-04-17',
        gender: 'female',
        bloodType: null,
        rhesus: null,
      },
      createdAt: '2026-10-01T08:00:00.000Z',
    },
    password: 'password123',
  },
  {
    user: {
      id: 'usr_demo_utd',
      email: 'admin@utd.donorku.id',
      role: 'utd',
      profile: {
        fullName: 'Admin UTD',
        phone: '081200000001',
        birthDate: '1988-02-11',
        gender: 'male',
        bloodType: 'O',
        rhesus: 'positive',
      },
      createdAt: '2026-10-01T08:00:00.000Z',
    },
    password: 'password123',
  },
  {
    user: {
      id: 'usr_demo_rs',
      email: 'admin@rs.donorku.id',
      role: 'hospital',
      profile: {
        fullName: 'Admin RS Harapan Sehat',
        phone: '081200000002',
        birthDate: '1985-06-23',
        gender: 'female',
        bloodType: 'B',
        rhesus: 'positive',
      },
      hospitalName: 'RS Harapan Sehat',
      createdAt: '2026-10-01T08:00:00.000Z',
    },
    password: 'password123',
  },
]
