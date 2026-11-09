import type { BloodBagRepository } from '../../domain/repositories/blood-bag-repository'
import type { StockSummaryDto } from '../dto/blood-stock.dto'
import { toStockSummaryDto } from '../mappers/stock-mapper'

/** UTD-04: ringkasan stok per golongan, yang hampir expired, dan yang kritis. */
export function createGetStockSummaryUseCase(repository: BloodBagRepository, today: string) {
  return async (): Promise<StockSummaryDto> => {
    const bags = await repository.findAll()

    return toStockSummaryDto(bags, today)
  }
}

export type GetStockSummary = ReturnType<typeof createGetStockSummaryUseCase>
