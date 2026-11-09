import type { BloodBag } from '../entities/blood-bag'

/** Kontrak penyimpanan kantong darah. */
export type BloodBagRepository = {
  findAll(): Promise<readonly BloodBag[]>
  add(bag: BloodBag): Promise<void>
}
