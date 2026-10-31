import type {
  DonorLocation,
  DonorLocationWithSchedules,
  DonorSchedule,
} from '@/domain/entities/donor-location'
import type { EntityId } from '@/shared/types/common'

/** Kontrak akses data lokasi & jadwal donor — PD-01, PD-02, EX-02. */
export interface DonorLocationRepository {
  findById(id: EntityId): Promise<DonorLocationWithSchedules | null>
  listActive(): Promise<readonly DonorLocationWithSchedules[]>
  listSchedules(locationId: EntityId): Promise<readonly DonorSchedule[]>
  save(location: DonorLocation): Promise<DonorLocation>
  saveSchedule(schedule: DonorSchedule): Promise<DonorSchedule>
}
