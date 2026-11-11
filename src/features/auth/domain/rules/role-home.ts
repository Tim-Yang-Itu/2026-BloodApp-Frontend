import type { UserRole } from '../entities/user'

/** Awalan rute yang menjadi hak tiap peran (area yang dijaga `RequireRole`). */
const ROLE_AREA_PREFIXES: Record<UserRole, readonly string[]> = {
  donor: ['/dashboard-pendonor', '/jadwal-donor', '/form-donor', '/tiket-saya'],
  utd: ['/utd'],
  hospital: ['/dashboard-rs'],
}

/** Halaman tujuan setelah login berhasil. */
export function roleHomePath(role: UserRole): string {
  if (role === 'donor') {
    return '/dashboard-pendonor'
  }

  if (role === 'utd') {
    return '/utd'
  }

  return '/dashboard-rs'
}

/** `true` bila `path` berada di area milik `role`. Query/hash diabaikan. */
export function isPathOwnedByRole(path: string, role: UserRole): boolean {
  const pathname = path.split(/[?#]/)[0]

  return ROLE_AREA_PREFIXES[role].some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

/**
 * Memvalidasi tujuan pengalihan setelah login.
 * Hanya path internal (`/...`) yang diterima agar tidak menjadi open redirect.
 */
export function safeRedirectPath(value: string | null | undefined, fallback: string): string {
  if (!value) {
    return fallback
  }

  if (!value.startsWith('/') || value.startsWith('//')) {
    return fallback
  }

  return value
}

/**
 * Tujuan akhir setelah login: `?redirect=` hanya dipakai bila tujuannya berada
 * di area peran pengguna, selain itu kembali ke beranda perannya.
 *
 * Tanpa pemeriksaan peran, Admin RS yang membuka halaman pendonor saat belum
 * masuk (`/login?redirect=/dashboard-pendonor`) akan mendarat di dashboard
 * pendonor setelah login.
 */
export function safeLandingPath(value: string | null | undefined, role: UserRole): string {
  const target = safeRedirectPath(value, roleHomePath(role))

  return isPathOwnedByRole(target, role) ? target : roleHomePath(role)
}
