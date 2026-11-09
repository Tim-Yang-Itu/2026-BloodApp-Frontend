import type { BloodType, RhesusType } from '@/shared/domain/blood'
import { addDays } from '@/shared/utils/date'

import type { BloodBag, BloodBagStatus } from '../../domain/entities/blood-bag'
import { expiryDateFor } from '../../domain/rules/stock'

/**
 * Tanggal acuan data demo.
 * Dibuat tetap agar ringkasan "hampir expired" dan label tanggal di UI stabil.
 */
export const DEMO_TODAY = '2026-11-02'

function createBag(
  id: string,
  bloodType: BloodType,
  rhesus: RhesusType,
  collectedAt: string,
  status: BloodBagStatus = 'available',
): BloodBag {
  return {
    id,
    bloodType,
    rhesus,
    collectedAt,
    expiresAt: expiryDateFor(collectedAt),
    status,
  }
}

/**
 * Kantong dengan tanggal dan status khusus agar kartu ringkasan sesuai
 * contoh desain: 7 hampir expired, 2 expired, 2 dipesan, 1 terpakai.
 */
const SPECIAL_BAGS: readonly BloodBag[] = [
  createBag('KD-0431', 'O', 'positive', '2026-11-01'),
  createBag('KD-0430', 'A', 'positive', '2026-10-31'),
  createBag('KD-0429', 'B', 'negative', '2026-10-28', 'reserved'),
  createBag('KD-0427', 'O', 'positive', '2026-10-04'),
  createBag('KD-0426', 'B', 'positive', '2026-10-03'),
  createBag('KD-0425', 'AB', 'negative', '2026-10-05'),
  createBag('KD-0424', 'O', 'negative', '2026-09-26', 'expired'),
  createBag('KD-0423', 'AB', 'positive', '2026-10-02', 'reserved'),
  createBag('KD-0422', 'B', 'positive', '2026-10-04'),
  createBag('KD-0421', 'O', 'positive', '2026-10-10'),
  createBag('KD-0420', 'A', 'negative', '2026-10-02', 'used'),
  createBag('KD-0418', 'O', 'positive', '2026-10-01'),
  createBag('KD-0412', 'A', 'positive', '2026-09-29'),
  createBag('KD-0398', 'AB', 'positive', '2026-09-20', 'expired'),
]

type RemainingTarget = {
  bloodType: BloodType
  rhesus: RhesusType
  count: number
}

/** Sisa kantong yang dibuat otomatis sehingga total per golongan sesuai desain. */
const REMAINING_TARGETS: readonly RemainingTarget[] = [
  { bloodType: 'A', rhesus: 'positive', count: 8 },
  { bloodType: 'A', rhesus: 'negative', count: 5 },
  { bloodType: 'B', rhesus: 'positive', count: 14 },
  { bloodType: 'B', rhesus: 'negative', count: 3 },
  { bloodType: 'AB', rhesus: 'positive', count: 6 },
  { bloodType: 'AB', rhesus: 'negative', count: 1 },
  { bloodType: 'O', rhesus: 'positive', count: 26 },
  { bloodType: 'O', rhesus: 'negative', count: 1 },
]

function createGeneratedBags(): BloodBag[] {
  const bags: BloodBag[] = []
  let idNumber = 417
  let index = 0

  for (const target of REMAINING_TARGETS) {
    for (let count = 0; count < target.count; count += 1) {
      // Tanggal 16–28 Okt 2026 agar tidak ada yang masuk kategori hampir expired.
      const collectedAt = addDays('2026-10-16', index % 13)

      bags.push(
        createBag(
          `KD-${String(idNumber).padStart(4, '0')}`,
          target.bloodType,
          target.rhesus,
          collectedAt,
        ),
      )

      idNumber -= 1
      index += 1
    }
  }

  return bags
}

/** 14 kantong khusus + 64 kantong otomatis = 78 kantong. */
export const DEMO_BLOOD_BAGS: readonly BloodBag[] = [...SPECIAL_BAGS, ...createGeneratedBags()]
