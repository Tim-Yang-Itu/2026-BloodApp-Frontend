/**
 * Public API fitur `blood-stock`.
 *
 * Cakupan PRD:
 * - UTD-02 Input kantong darah baru (golongan, rhesus, tanggal expired, data pendukung)
 * - UTD-03 Penyimpanan & penelusuran kembali kantong darah
 * - UTD-04 Monitoring stok per golongan darah dan rhesus
 * - RS-02  Cek ketersediaan darah real time
 *
 * Rencana ekspor:
 * - use case: createBloodBag, listStock, getStockSummary, getAvailability
 * - tipe publik: BloodBag, BloodTestStatus, StockLevel, StockSummary
 * - aturan domain: isBagUsable, daysUntilExpiry, getStockLevel
 */
export {}
