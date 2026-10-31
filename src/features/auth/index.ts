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
 * - kontrak: AuthRepository, TokenStoragePort
 */
export {}
