import type { UserRole } from '@/domain/enums/user'

/** Peta URL aplikasi agar tidak ada string rute yang tersebar di komponen. */
export const ROUTES = {
  home: '/',
  login: '/login',
  registerDonor: '/register',
  donorDashboard: '/donor',
  utdDashboard: '/utd',
  hospitalDashboard: '/rs',
  forbidden: '/403',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

/** Halaman beranda setelah login, dipisah per peran — PRD §2. */
export const ROLE_HOME_ROUTES: Record<UserRole, AppRoute> = {
  donor: ROUTES.donorDashboard,
  utd_admin: ROUTES.utdDashboard,
  hospital_admin: ROUTES.hospitalDashboard,
}

export const getHomeRouteForRole = (role: UserRole): AppRoute => ROLE_HOME_ROUTES[role]
