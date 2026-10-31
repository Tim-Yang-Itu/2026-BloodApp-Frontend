import type { BloodBag } from '@/domain/entities/blood-bag'
import type {
  BloodBagStatus,
  BloodComponent,
  BloodGroup,
  BloodTestStatus,
  Rhesus,
} from '@/domain/enums/blood'
import { fromNowDays } from '@/infrastructure/demo/demo-clock'

/** Fasilitas UTD/PMI pemilik data demo. */
export const DEMO_UTD_FACILITY_ID = 'fac-utd-01'

interface BagSeed {
  readonly bagNumber: string
  readonly bloodGroup: BloodGroup
  readonly rhesus: Rhesus
  readonly component: BloodComponent
  readonly volumeMl: number
  readonly collectedDaysAgo: number
  readonly expiresInDays: number
  readonly testStatus: BloodTestStatus
  readonly status: BloodBagStatus
}

const toBag = (seed: BagSeed, index: number): BloodBag => ({
  id: `bag-${index + 1}`,
  facilityId: DEMO_UTD_FACILITY_ID,
  bagNumber: seed.bagNumber,
  bloodGroup: seed.bloodGroup,
  rhesus: seed.rhesus,
  component: seed.component,
  volumeMl: seed.volumeMl,
  collectedAt: fromNowDays(-seed.collectedDaysAgo),
  expiresAt: fromNowDays(seed.expiresInDays),
  testedAt: seed.testStatus === 'untested' ? null : fromNowDays(-seed.collectedDaysAgo + 1),
  testStatus: seed.testStatus,
  status: seed.status,
  createdAt: fromNowDays(-seed.collectedDaysAgo),
  updatedAt: fromNowDays(-seed.collectedDaysAgo + 1),
})

const BAG_SEEDS: readonly BagSeed[] = [
  // O+ — stok banyak, satu mendekati kedaluwarsa
  { bagNumber: 'UTD-2601-001', bloodGroup: 'O', rhesus: 'positive', component: 'prc', volumeMl: 350, collectedDaysAgo: 12, expiresInDays: 23, testStatus: 'passed', status: 'available' },
  { bagNumber: 'UTD-2601-002', bloodGroup: 'O', rhesus: 'positive', component: 'prc', volumeMl: 350, collectedDaysAgo: 14, expiresInDays: 21, testStatus: 'passed', status: 'available' },
  { bagNumber: 'UTD-2601-003', bloodGroup: 'O', rhesus: 'positive', component: 'prc', volumeMl: 350, collectedDaysAgo: 16, expiresInDays: 19, testStatus: 'passed', status: 'available' },
  { bagNumber: 'UTD-2601-004', bloodGroup: 'O', rhesus: 'positive', component: 'whole_blood', volumeMl: 450, collectedDaysAgo: 18, expiresInDays: 17, testStatus: 'passed', status: 'available' },
  { bagNumber: 'UTD-2601-005', bloodGroup: 'O', rhesus: 'positive', component: 'prc', volumeMl: 350, collectedDaysAgo: 28, expiresInDays: 4, testStatus: 'passed', status: 'available' },

  // A+ — sedang
  { bagNumber: 'UTD-2601-006', bloodGroup: 'A', rhesus: 'positive', component: 'prc', volumeMl: 350, collectedDaysAgo: 9, expiresInDays: 26, testStatus: 'passed', status: 'available' },
  { bagNumber: 'UTD-2601-007', bloodGroup: 'A', rhesus: 'positive', component: 'prc', volumeMl: 350, collectedDaysAgo: 11, expiresInDays: 24, testStatus: 'passed', status: 'available' },
  { bagNumber: 'UTD-2601-008', bloodGroup: 'A', rhesus: 'positive', component: 'ffp', volumeMl: 200, collectedDaysAgo: 20, expiresInDays: 150, testStatus: 'passed', status: 'available' },
  { bagNumber: 'UTD-2601-009', bloodGroup: 'A', rhesus: 'positive', component: 'prc', volumeMl: 350, collectedDaysAgo: 6, expiresInDays: 29, testStatus: 'reactive', status: 'blocked' },

  // B+ — menipis
  { bagNumber: 'UTD-2601-010', bloodGroup: 'B', rhesus: 'positive', component: 'prc', volumeMl: 350, collectedDaysAgo: 13, expiresInDays: 22, testStatus: 'passed', status: 'available' },
  { bagNumber: 'UTD-2601-011', bloodGroup: 'B', rhesus: 'positive', component: 'trombosit', volumeMl: 250, collectedDaysAgo: 1, expiresInDays: 4, testStatus: 'untested', status: 'untested' },

  // AB+ — aman untuk FFP
  { bagNumber: 'UTD-2601-012', bloodGroup: 'AB', rhesus: 'positive', component: 'ffp', volumeMl: 200, collectedDaysAgo: 21, expiresInDays: 160, testStatus: 'passed', status: 'available' },
  { bagNumber: 'UTD-2601-013', bloodGroup: 'AB', rhesus: 'positive', component: 'prc', volumeMl: 350, collectedDaysAgo: 10, expiresInDays: 25, testStatus: 'passed', status: 'available' },

  // O− — langka, kritis
  { bagNumber: 'UTD-2601-014', bloodGroup: 'O', rhesus: 'negative', component: 'prc', volumeMl: 350, collectedDaysAgo: 15, expiresInDays: 20, testStatus: 'passed', status: 'available' },

  // Sudah kedaluwarsa — tidak boleh dihitung sebagai stok
  { bagNumber: 'UTD-2501-088', bloodGroup: 'A', rhesus: 'negative', component: 'prc', volumeMl: 350, collectedDaysAgo: 42, expiresInDays: -2, testStatus: 'passed', status: 'expired' },
]

/** Data contoh kantong darah untuk tampilan demo (tanpa backend). */
export const DEMO_BLOOD_BAGS: readonly BloodBag[] = BAG_SEEDS.map(toBag)
