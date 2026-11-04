/**
 * Public API fitur `auth`.
 *
 * Hanya simbol yang diekspor di sini yang boleh dipakai fitur lain atau `src/app`.
 * Jangan mengimpor langsung ke `features/auth/domain/*` dari luar fitur.
 *
 * Cakupan PRD:
 * - UTD-01 Login dashboard Admin UTD/PMI
 * - RS-01  Login dashboard Admin RS
 * - PDN-04 Registrasi & login pendonor (akun dibuat saat pengguna memutuskan donor)
 *
 * Rencana ekspor:
 * - use case: login, logout, registerDonor, restoreSession
 * - tipe publik: AuthenticatedUser, UserRole, LoginInput, RegisterDonorInput
 */

export { createAuthModule } from './infrastructure/container'
export type { AuthModule } from './infrastructure/container'

export type { LoginInput, RegisterDonorInput } from './application/dto/auth.dto'
export type { AuthUser, DonorProfile, UserRole } from './domain/entities/user'
export { initialsOf, shortNameOf } from './domain/entities/user'
export { authErrorMessage } from './domain/errors/auth-error'
export { roleHomePath, safeRedirectPath } from './domain/rules/role-home'

export { AuthProvider } from './presentation/contexts/AuthProvider'
export { useAuth } from './presentation/hooks/use-auth'
export { RequireAuth } from './presentation/components/RequireAuth'
export { AuthSplitLayout } from './presentation/components/AuthSplitLayout'
export { AuthTabs } from './presentation/components/AuthTabs'
export type { AuthTab } from './presentation/components/AuthTabs'
export { LoginPage } from './presentation/pages/LoginPage'
export { RegisterPage } from './presentation/pages/RegisterPage'
