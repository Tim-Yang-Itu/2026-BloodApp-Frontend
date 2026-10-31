/**
 * Port enkripsi untuk data sensitif (NIK, data kesehatan) — PRD §7.
 * Implementasi nyata berada di infrastructure/backend.
 */
export interface CryptoService {
  encrypt(plainText: string): Promise<string>
  decrypt(cipherText: string): Promise<string>
}
