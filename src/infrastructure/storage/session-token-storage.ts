/**
 * Penyimpanan token sesi di `sessionStorage`.
 *
 * Token sengaja tidak disimpan di `localStorage` agar sesi berakhir saat tab
 * ditutup dan data kesehatan tidak tertinggal di perangkat bersama (PRD §7-§8).
 */
import type { TokenStorage } from '@/application/ports/token-storage-port'

const STORAGE_KEY = 'darahterpadu.session.token'

export const createSessionTokenStorage = (): TokenStorage => {
  let memoryFallback: string | null = null

  return {
    get(): string | null {
      try {
        return window.sessionStorage.getItem(STORAGE_KEY) ?? memoryFallback
      } catch {
        return memoryFallback
      }
    },
    set(token: string | null): void {
      memoryFallback = token
      try {
        if (token) {
          window.sessionStorage.setItem(STORAGE_KEY, token)
        } else {
          window.sessionStorage.removeItem(STORAGE_KEY)
        }
      } catch {
        // mode privat/penyimpanan penuh: gunakan fallback di memori
      }
    },
  }
}
