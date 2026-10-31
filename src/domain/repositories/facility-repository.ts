import type { Facility } from '@/domain/entities/facility'
import type { FacilityType } from '@/domain/enums/user'
import type { EntityId } from '@/shared/types/common'

/** Kontrak akses data fasilitas (UTD/PMI & RS) — PRD §7. */
export interface FacilityRepository {
  findById(id: EntityId): Promise<Facility | null>
  listByType(type: FacilityType): Promise<readonly Facility[]>
  save(facility: Facility): Promise<Facility>
}
