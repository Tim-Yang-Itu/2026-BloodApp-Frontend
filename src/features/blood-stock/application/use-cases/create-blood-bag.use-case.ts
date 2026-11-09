import { BLOOD_TYPES, RHESUS_TYPES } from '@/shared/domain/blood'

import type { BloodBag } from '../../domain/entities/blood-bag'
import { BloodStockError } from '../../domain/errors/blood-stock-error'
import type { BloodBagRepository } from '../../domain/repositories/blood-bag-repository'
import { expiryDateFor, nextBagId } from '../../domain/rules/stock'
import type { CreateBloodBagInput, StockBagDto } from '../dto/blood-stock.dto'
import { toStockBagDto } from '../mappers/stock-mapper'

const CALENDAR_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

/**
 * UTD-02: mencatat kantong darah baru.
 * Tanggal kedaluwarsa dihitung otomatis dari masa simpan kantong (35 hari).
 */
export function createCreateBloodBagUseCase(repository: BloodBagRepository, today: string) {
  return async (input: CreateBloodBagInput): Promise<StockBagDto> => {
    if (!BLOOD_TYPES.includes(input.bloodType)) {
      throw new BloodStockError('invalid-input', 'Golongan darah tidak dikenal.')
    }

    if (!RHESUS_TYPES.includes(input.rhesus)) {
      throw new BloodStockError('invalid-input', 'Rhesus darah tidak dikenal.')
    }

    if (!CALENDAR_DATE_PATTERN.test(input.collectedAt)) {
      throw new BloodStockError('invalid-input', 'Isi tanggal masuk kantong.')
    }

    if (input.collectedAt > today) {
      throw new BloodStockError('invalid-input', 'Tanggal masuk tidak boleh melewati hari ini.')
    }

    const existing = await repository.findAll()
    const bag: BloodBag = {
      id: nextBagId(existing.map((item) => item.id)),
      bloodType: input.bloodType,
      rhesus: input.rhesus,
      collectedAt: input.collectedAt,
      expiresAt: expiryDateFor(input.collectedAt),
      status: 'available',
    }

    await repository.add(bag)

    return toStockBagDto(bag, today)
  }
}

export type CreateBloodBag = ReturnType<typeof createCreateBloodBagUseCase>
