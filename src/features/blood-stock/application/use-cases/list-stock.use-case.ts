import type { BloodBagRepository } from '../../domain/repositories/blood-bag-repository'
import type { StockBagDto } from '../dto/blood-stock.dto'
import { toStockBagDto } from '../mappers/stock-mapper'

/**
 * UTD-03 / UTD-04: daftar kantong tersimpan, terbaru lebih dulu.
 */
export function createListStockUseCase(repository: BloodBagRepository, today: string) {
  return async (): Promise<StockBagDto[]> => {
    const bags = await repository.findAll()

    return bags
      .map((bag) => toStockBagDto(bag, today))
      .sort((left, right) => right.id.localeCompare(left.id))
  }
}

export type ListStock = ReturnType<typeof createListStockUseCase>
