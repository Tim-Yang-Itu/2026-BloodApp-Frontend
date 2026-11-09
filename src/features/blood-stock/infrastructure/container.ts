import { createCreateBloodBagUseCase } from '../application/use-cases/create-blood-bag.use-case'
import { createGetStockSummaryUseCase } from '../application/use-cases/get-stock-summary.use-case'
import { createListStockUseCase } from '../application/use-cases/list-stock.use-case'
import { DEMO_TODAY } from './demo/demo-blood-bags'
import { InMemoryBloodBagRepository } from './repositories/in-memory-blood-bag-repository'

/**
 * Perakitan dependensi fitur `blood-stock`.
 * Dipanggil sekali dari `src/app/container.ts`; hasilnya dibagikan ke halaman
 * lewat provider React.
 */
export function createBloodStockModule() {
  const repository = new InMemoryBloodBagRepository()
  const today = DEMO_TODAY

  return {
    today,
    listStock: createListStockUseCase(repository, today),
    getStockSummary: createGetStockSummaryUseCase(repository, today),
    createBloodBag: createCreateBloodBagUseCase(repository, today),
  }
}

export type BloodStockModule = ReturnType<typeof createBloodStockModule>
