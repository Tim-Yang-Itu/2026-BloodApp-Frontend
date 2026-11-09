import { createAuthModule } from '@/features/auth'
import { createBloodRequestModule } from '@/features/blood-request'
import { createBloodStockModule } from '@/features/blood-stock'
import { createDonorLocationModule } from '@/features/donor-location'
import { createDonorRegistrationModule } from '@/features/donor-registration'

/**
 * Composition root seluruh fitur.
 *
 * Setiap fitur menyediakan fungsi `create<Fitur>Module()` di
 * `features/<fitur>/infrastructure/container.ts` yang mengekspor use case siap pakai.
 * Container ini dirakit sekali, lalu dibagikan ke React lewat provider di `src/app`.
 *
 * Menambah fitur baru = menambah satu baris di sini.
 */
export const container = {
  auth: createAuthModule(),
  bloodRequest: createBloodRequestModule(),
  bloodStock: createBloodStockModule(),
  donorLocation: createDonorLocationModule(),
  donorRegistration: createDonorRegistrationModule(),
}

export type AppContainer = typeof container
