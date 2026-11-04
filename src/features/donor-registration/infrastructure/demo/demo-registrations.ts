import type { DonorRegistration } from '../../domain/entities/donor-registration'

/**
 * Riwayat contoh untuk akun demo, supaya halaman riwayat tidak kosong
 * saat aplikasi pertama kali dibuka.
 */
export const DEMO_REGISTRATIONS: readonly DonorRegistration[] = [
  {
    id: 'reg_demo_2026_08',
    bookingCode: 'DK-20260812-0117',
    userId: 'usr_demo_nabila',
    locationId: 'utd-pmi-surabaya',
    locationName: 'UTD PMI Kota Surabaya',
    locationAddress: 'Jl. Contoh Raya No. 12, Surabaya',
    date: '2026-08-12',
    time: '09.00',
    status: 'completed',
    passedScreening: true,
    identity: {
      fullName: 'Nabila Firda Suryani',
      nik: '3578000000000001',
      birthDate: '2001-04-17',
      gender: 'female',
      address: 'Jl. Contoh Domisili No. 8, Surabaya',
      phone: '081234567890',
      occupation: 'Mahasiswa',
      bloodType: null,
      rhesus: null,
      weightKg: 52,
      lastDonation: 'never',
      emergencyContactName: '',
      emergencyContactPhone: '',
    },
    createdAt: '2026-08-10T04:15:00.000Z',
  },
]
