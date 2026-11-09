import type { BloodRequest } from '../../domain/entities/blood-request'

function at(day: string, time: string): string {
  return `${day}T${time}:00.000Z`
}

/**
 * Data demo permintaan rumah sakit.
 *
 * Tanggal acuan demo: `DEMO_TODAY` = 2026-11-02 (lihat `blood-stock`).
 */
export const DEMO_BLOOD_REQUESTS: readonly BloodRequest[] = [
  {
    id: 'REQ-0091',
    hospitalName: 'RS Harapan Sehat',
    bloodType: 'O',
    rhesus: 'negative',
    quantity: 4,
    urgency: 'high',
    requestedAt: at('2026-11-02', '03:40'),
    status: 'pending',
    rejectionReason: null,
  },
  {
    id: 'REQ-0090',
    hospitalName: 'RS Bhakti Husada',
    bloodType: 'B',
    rhesus: 'positive',
    quantity: 2,
    urgency: 'medium',
    requestedAt: at('2026-11-02', '02:15'),
    status: 'pending',
    rejectionReason: null,
  },
  {
    id: 'REQ-0089',
    hospitalName: 'RS Medika Utama',
    bloodType: 'A',
    rhesus: 'positive',
    quantity: 3,
    urgency: 'high',
    requestedAt: at('2026-11-02', '01:05'),
    status: 'pending',
    rejectionReason: null,
  },
  {
    id: 'REQ-0088',
    hospitalName: 'RS Ibu dan Anak Melati',
    bloodType: 'AB',
    rhesus: 'positive',
    quantity: 1,
    urgency: 'low',
    requestedAt: at('2026-11-01', '08:20'),
    status: 'approved',
    rejectionReason: null,
  },
  {
    id: 'REQ-0087',
    hospitalName: 'RS Bhakti Husada',
    bloodType: 'A',
    rhesus: 'positive',
    quantity: 2,
    urgency: 'medium',
    requestedAt: at('2026-11-01', '06:10'),
    status: 'approved',
    rejectionReason: null,
  },
  {
    id: 'REQ-0086',
    hospitalName: 'RS Harapan Sehat',
    bloodType: 'O',
    rhesus: 'positive',
    quantity: 5,
    urgency: 'high',
    requestedAt: at('2026-11-01', '03:45'),
    status: 'rejected',
    rejectionReason: 'Stok O+ tidak mencukupi kebutuhan operasi pagi ini.',
  },
  {
    id: 'REQ-0085',
    hospitalName: 'RS Medika Utama',
    bloodType: 'B',
    rhesus: 'negative',
    quantity: 1,
    urgency: 'low',
    requestedAt: at('2026-10-31', '09:30'),
    status: 'rejected',
    rejectionReason: 'Permintaan ganda untuk pasien yang sama.',
  },
  {
    id: 'REQ-0084',
    hospitalName: 'RS Ibu dan Anak Melati',
    bloodType: 'A',
    rhesus: 'negative',
    quantity: 3,
    urgency: 'medium',
    requestedAt: at('2026-10-30', '04:25'),
    status: 'approved',
    rejectionReason: null,
  },
]
