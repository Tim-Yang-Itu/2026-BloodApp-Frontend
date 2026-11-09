import type { BloodBag } from '../../domain/entities/blood-bag'
import type { BloodBagRepository } from '../../domain/repositories/blood-bag-repository'
import { DEMO_BLOOD_BAGS } from '../demo/demo-blood-bags'

/**
 * Implementasi sementara `BloodBagRepository` memakai data demo.
 * Saat backend tersedia, buat `HttpBloodBagRepository` dengan kontrak yang sama
 * lalu tukar di `infrastructure/container.ts`.
 */
export class InMemoryBloodBagRepository implements BloodBagRepository {
  private bags: BloodBag[]

  constructor(bags: readonly BloodBag[] = DEMO_BLOOD_BAGS) {
    this.bags = [...bags]
  }

  async findAll(): Promise<readonly BloodBag[]> {
    return this.bags
  }

  async add(bag: BloodBag): Promise<void> {
    this.bags = [bag, ...this.bags]
  }
}
