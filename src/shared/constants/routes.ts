/**
 * Daftar rute tingkat atas aplikasi.
 *
 * Satu sumber agar path tidak salah ketik antar file. Rute bersarang di dalam
 * area peran (`/utd/*`, `/jadwal-donor/*`) tetap ditulis langsung di
 * `src/app/router/AppRoutes.tsx` karena hanya dipakai di sana.
 */
export const ROUTES = {
  login: '/login',
  register: '/register',
  hospitalDashboard: '/dashboard-rs',
  hospitalStock: '/dashboard-rs/stok',
  hospitalRequests: '/dashboard-rs/permintaan',
  utdDashboard: '/utd',
  utdStock: '/utd/stok',
  utdRequests: '/utd/permintaan',
  donorDashboard: '/dashboard-pendonor',
  donorSchedule: '/jadwal-donor',
  donorScheduleDetail: '/jadwal-donor/:locationId',
  donorForm: '/form-donor',
  donorTickets: '/tiket-saya',
  donorTicketDetail: '/tiket-saya/:bookingCode',
  landing: '/',
  donorLocations: '/lokasi-donor',
  donorLocationDetail: '/lokasi-donor/:locationId',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
