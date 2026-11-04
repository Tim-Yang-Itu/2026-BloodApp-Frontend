import { createDonorLocationModule } from '@/features/donor-location'

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
  donorLocation: createDonorLocationModule(),
}

export type AppContainer = typeof container
