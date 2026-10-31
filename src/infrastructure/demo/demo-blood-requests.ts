import type { BloodRequest } from '@/domain/entities/blood-request'
import { fromNowDays } from '@/infrastructure/demo/demo-clock'
import { DEMO_UTD_FACILITY_ID } from '@/infrastructure/demo/demo-blood-bags'

/** Fasilitas rumah sakit pemilik data demo. */
export const DEMO_HOSPITAL_FACILITY_ID = 'fac-rs-01'

/** Data contoh permintaan darah dari RS ke UTD/PMI — AR-03..AR-06, AU-04..AU-06. */
export const DEMO_BLOOD_REQUESTS: readonly BloodRequest[] = [
  {
    id: 'req-1',
    requestNumber: 'REQ-2610-014',
    hospitalId: DEMO_HOSPITAL_FACILITY_ID,
    utdId: DEMO_UTD_FACILITY_ID,
    requestedBy: 'usr-rs-01',
    items: [
      { id: 'req-1-item-1', bloodGroup: 'O', rhesus: 'positive', component: 'prc', quantity: 3 },
    ],
    urgency: 'emergency',
    status: 'pending',
    patient: { patientName: 'Ny. R.', medicalRecordNumber: 'RM-884201', room: 'IGD-02' },
    rejectionReason: null,
    statusHistory: [
      {
        status: 'pending',
        changedAt: fromNowDays(-0.05),
        changedBy: 'usr-rs-01',
        note: 'Permintaan gawat darurat dari IGD.',
      },
    ],
    createdAt: fromNowDays(-0.05),
    updatedAt: fromNowDays(-0.05),
  },
  {
    id: 'req-2',
    requestNumber: 'REQ-2610-012',
    hospitalId: DEMO_HOSPITAL_FACILITY_ID,
    utdId: DEMO_UTD_FACILITY_ID,
    requestedBy: 'usr-rs-01',
    items: [
      { id: 'req-2-item-1', bloodGroup: 'A', rhesus: 'positive', component: 'prc', quantity: 2 },
      { id: 'req-2-item-2', bloodGroup: 'A', rhesus: 'positive', component: 'ffp', quantity: 2 },
    ],
    urgency: 'urgent',
    status: 'approved',
    patient: { patientName: 'Tn. S.', medicalRecordNumber: 'RM-884177', room: 'Rawat Inap 3' },
    rejectionReason: null,
    statusHistory: [
      { status: 'pending', changedAt: fromNowDays(-1.2), changedBy: 'usr-rs-01', note: null },
      {
        status: 'approved',
        changedAt: fromNowDays(-0.9),
        changedBy: 'usr-utd-01',
        note: 'Stok cukup, kantong disiapkan.',
      },
    ],
    createdAt: fromNowDays(-1.2),
    updatedAt: fromNowDays(-0.9),
  },
  {
    id: 'req-3',
    requestNumber: 'REQ-2610-009',
    hospitalId: DEMO_HOSPITAL_FACILITY_ID,
    utdId: DEMO_UTD_FACILITY_ID,
    requestedBy: 'usr-rs-01',
    items: [
      {
        id: 'req-3-item-1',
        bloodGroup: 'B',
        rhesus: 'negative',
        component: 'prc',
        quantity: 2,
      },
    ],
    urgency: 'routine',
    status: 'rejected',
    patient: { patientName: 'Ny. L.', medicalRecordNumber: 'RM-884153', room: 'Rawat Inap 1' },
    rejectionReason: 'Stok B− kosong dan belum ada jadwal donor terdekat di wilayah ini.',
    statusHistory: [
      { status: 'pending', changedAt: fromNowDays(-2.4), changedBy: 'usr-rs-01', note: null },
      {
        status: 'rejected',
        changedAt: fromNowDays(-2.1),
        changedBy: 'usr-utd-01',
        note: 'Stok B− kosong.',
      },
    ],
    createdAt: fromNowDays(-2.4),
    updatedAt: fromNowDays(-2.1),
  },
  {
    id: 'req-4',
    requestNumber: 'REQ-2609-031',
    hospitalId: DEMO_HOSPITAL_FACILITY_ID,
    utdId: DEMO_UTD_FACILITY_ID,
    requestedBy: 'usr-rs-01',
    items: [
      { id: 'req-4-item-1', bloodGroup: 'O', rhesus: 'positive', component: 'prc', quantity: 1 },
    ],
    urgency: 'urgent',
    status: 'received',
    patient: { patientName: 'Tn. A.', medicalRecordNumber: 'RM-884090', room: 'ICU' },
    rejectionReason: null,
    statusHistory: [
      { status: 'pending', changedAt: fromNowDays(-5.5), changedBy: 'usr-rs-01', note: null },
      {
        status: 'approved',
        changedAt: fromNowDays(-5.2),
        changedBy: 'usr-utd-01',
        note: 'Disetujui, kurir dikirim.',
      },
      {
        status: 'received',
        changedAt: fromNowDays(-5),
        changedBy: 'usr-rs-01',
        note: 'Diterima lengkap oleh unit transfusi RS.',
      },
    ],
    createdAt: fromNowDays(-5.5),
    updatedAt: fromNowDays(-5),
  },
]
