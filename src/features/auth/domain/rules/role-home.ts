import type { UserRole } from '../entities/user'

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
