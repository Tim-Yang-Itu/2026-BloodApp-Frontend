import type { UserRole } from '../entities/user'

/**
 * Halaman tujuan setelah login berhasil.
 * Dashboard UTD/RS belum dibangun, jadi sementara diarahkan ke halaman status.
 */
export function roleHomePath(role: UserRole): string {
  if (role === 'donor') {
    return '/dashboard-pendonor'
  }

  return '/status'
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
