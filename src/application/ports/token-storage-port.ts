/**
 * Port penyimpanan token sesi. Implementasi browser dapat memakai memory /
 * sessionStorage; jangan menyimpan token di localStorage untuk data medis.
 */
export interface TokenStorage {
  get(): string | null
  set(token: string | null): void
}
