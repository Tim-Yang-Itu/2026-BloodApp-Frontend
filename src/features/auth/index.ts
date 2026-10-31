/**
 * Public API fitur `auth`.
 *
 * Hanya simbol yang diekspor di sini yang boleh dipakai fitur lain atau `src/app`.
 * Jangan mengimpor langsung ke `features/auth/domain/*` dari luar fitur.
 *
 * Rencana ekspor:
 * - use case: login, logout, registerDonor, restoreSession
 * - tipe publik: AuthenticatedUser, LoginInput, RegisterDonorInput
 * - kontrak: AuthRepository, TokenStoragePort
 */
export {}
