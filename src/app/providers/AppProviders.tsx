import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from '@/features/auth'

import { container } from '../container'

/**
 * Provider aplikasi: router + sesi pengguna.
 *
 * Semua dependensi dirakit di `src/app/container.ts`, jadi lapisan ini hanya
 * menyambungkan use case ke React.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <AuthProvider today={container.auth.today} useCases={container.auth}>
        {children}
      </AuthProvider>
    </BrowserRouter>
  )
}
