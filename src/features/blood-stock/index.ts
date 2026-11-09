/**
 * Public API fitur `blood-stock`.
 *
 * Cakupan PRD:
 * - UTD-02 Input kantong darah
 * - UTD-03 Penyimpanan kantong tersimpan
 * - UTD-04 Monitoring stok per golongan & rhesus
 * - RS-02 Cek ketersediaan real time
 */

export { createBloodStockModule } from './infrastructure/container'
export type { BloodStockModule } from './infrastructure/container'

export type {
  CreateBloodBagInput,
  CriticalStockDto,
  StockBagDto,
  StockGroupDto,
  StockSummaryDto,
} from './application/dto/blood-stock.dto'

export type { BloodBagStatus } from './domain/entities/blood-bag'
export { BLOOD_BAG_STATUS_LABEL } from './domain/enums/blood-bag-status'
export { MINIMUM_STOCK_PER_GROUP } from './domain/rules/stock'

export { BloodStockProvider } from './presentation/contexts/blood-stock-context'
export type { BloodStockUseCases } from './presentation/contexts/blood-stock-context'
export { useBloodStock } from './presentation/hooks/use-blood-stock'
export { StockPage } from './presentation/pages/StockPage'
