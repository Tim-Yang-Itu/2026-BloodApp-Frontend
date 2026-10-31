import type { ReactNode } from 'react'
import { AuthProvider } from '@/app/providers/AuthProvider'
import { DemoDataProvider } from '@/app/providers/DemoDataProvider'

/** Tempat mendaftarkan seluruh provider global aplikasi. */
export const AppProviders = ({ children }: { readonly children: ReactNode }) => (
  <AuthProvider>
    <DemoDataProvider>{children}</DemoDataProvider>
  </AuthProvider>
)
