import type { DonationRecord, Donor } from '@/domain/entities/donor'
import type { DonorRegistration } from '@/domain/entities/donor-registration'
import { fromNowDays } from '@/infrastructure/demo/demo-clock'
import { DEMO_UTD_FACILITY_ID } from '@/infrastructure/demo/demo-blood-bags'

export const DEMO_DONOR_ID = 'donor-01'

/** Profil pendonor contoh — PD-03, EX-04. */
export const DEMO_DONOR_PROFILE: Donor = {
  id: DEMO_DONOR_ID,
  userId: 'usr-donor-01',
  nikEncrypted: 'enc::demo::tidak-ditampilkan',
  bloodGroup: 'O',
  rhesus: 'positive',
  phone: '081234567890',
  address: 'Jl. Melati 12, Jakarta Selatan',
  lastDonationAt: fromNowDays(-96),
  nextEligibleAt: fromNowDays(-36),
  createdAt: fromNowDays(-820),
  updatedAt: fromNowDays(-96),
}

/** Riwayat donasi contoh — EX-04. */
export const DEMO_DONATION_HISTORY: readonly DonationRecord[] = [
  {
    id: 'donation-1',
    donorId: DEMO_DONOR_ID,
    registrationId: 'reg-1',
    facilityId: DEMO_UTD_FACILITY_ID,
    donatedAt: fromNowDays(-96),
    component: 'whole_blood',
    notes: 'Donasi rutin, hemoglobin 14,2 g/dL.',
    createdAt: fromNowDays(-96),
  },
  {
    id: 'donation-2',
    donorId: DEMO_DONOR_ID,
    registrationId: 'reg-2',
    facilityId: DEMO_UTD_FACILITY_ID,
    donatedAt: fromNowDays(-212),
    component: 'whole_blood',
    notes: null,
    createdAt: fromNowDays(-212),
  },
  {
    id: 'donation-3',
    donorId: DEMO_DONOR_ID,
    registrationId: 'reg-3',
    facilityId: DEMO_UTD_FACILITY_ID,
    donatedAt: fromNowDays(-331),
    component: 'prc',
    notes: 'Donor di acara kampus.',
    createdAt: fromNowDays(-331),
  },
]

/** Tiket digital aktif berisi kode QR — PD-05. */
export const DEMO_ACTIVE_REGISTRATION: DonorRegistration = {
  id: 'reg-4',
  donorId: DEMO_DONOR_ID,
  locationId: 'loc-1',
  scheduleId: 'sch-1',
  ticketCode: 'DT-2604-QR-8F2K',
  screening: {
    id: 'scr-4',
    answers: [
      { questionId: 'q1', question: 'Merasa sehat dan bugar hari ini?', answer: true },
      { questionId: 'q2', question: 'Sedang mengonsumsi antibiotik?', answer: false },
      { questionId: 'q3', question: 'Pernah menderita hepatitis B/C?', answer: false },
    ],
    weightKg: 68,
    hemoglobin: 14.2,
    bloodPressure: '118/76',
    result: 'eligible',
    notes: null,
    screenedAt: fromNowDays(-0.2),
    screenedBy: 'usr-utd-01',
  },
  status: 'registered',
  checkedInAt: null,
  completedAt: null,
  createdAt: fromNowDays(-0.2),
  updatedAt: fromNowDays(-0.2),
}
