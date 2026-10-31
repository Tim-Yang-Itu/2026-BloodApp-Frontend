import type { BloodBag } from '@/domain/entities/blood-bag'
import type { BloodComponent, BloodGroup, Rhesus } from '@/domain/enums/blood'
import type { EntityId } from '@/shared/types/common'

/** Kriteria pencarian stok — AU-03, AR-02, EX-05. */
export interface BloodStockQuery {
  readonly facilityId?: EntityId
  readonly bloodGroup?: BloodGroup
  readonly rhesus?: Rhesus
  readonly component?: BloodComponent
  /** Hanya kantong lolos uji yang dihitung tersedia — EX-01. */
  readonly availableOnly?: boolean
}

/** Kontrak akses data kantong darah. */
export interface BloodBagRepository {
  findById(id: EntityId): Promise<BloodBag | null>
  search(query: BloodStockQuery): Promise<readonly BloodBag[]>
  /** Kantong yang mendekati/melewati kedaluwarsa — AU-03. */
  listExpiring(facilityId: EntityId, withinDays: number): Promise<readonly BloodBag[]>
  save(bag: BloodBag): Promise<BloodBag>
  saveMany(bags: readonly BloodBag[]): Promise<void>
}
