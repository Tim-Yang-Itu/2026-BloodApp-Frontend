import type { DonorLocationWithSchedules } from '@/domain/entities/donor-location'
import { dateInDays, fromNowDays } from '@/infrastructure/demo/demo-clock'
import { DEMO_UTD_FACILITY_ID } from '@/infrastructure/demo/demo-blood-bags'

/** Lokasi & jadwal donor contoh — PD-01, PD-02, EX-02. */
export const DEMO_DONOR_LOCATIONS: readonly DonorLocationWithSchedules[] = [
  {
    id: 'loc-1',
    facilityId: DEMO_UTD_FACILITY_ID,
    name: 'UTD/PMI Kota Jakarta',
    address: 'Jl. Kramat Raya No. 47',
    city: 'Jakarta Pusat',
    latitude: -6.1862,
    longitude: 106.8447,
    isActive: true,
    createdAt: fromNowDays(-900),
    updatedAt: fromNowDays(-12),
    schedules: [
      {
        id: 'sch-1',
        locationId: 'loc-1',
        date: dateInDays(1),
        startTime: '08:00',
        endTime: '15:00',
        quota: 60,
        registeredCount: 41,
        createdAt: fromNowDays(-10),
        updatedAt: fromNowDays(-10),
      },
      {
        id: 'sch-2',
        locationId: 'loc-1',
        date: dateInDays(8),
        startTime: '08:00',
        endTime: '13:00',
        quota: 40,
        registeredCount: 12,
        createdAt: fromNowDays(-10),
        updatedAt: fromNowDays(-10),
      },
    ],
  },
  {
    id: 'loc-2',
    facilityId: DEMO_UTD_FACILITY_ID,
    name: 'Mall Kelapa Gading — Donor Corner',
    address: 'Jl. Boulevard Kelapa Gading',
    city: 'Jakarta Utara',
    latitude: -6.1577,
    longitude: 106.9071,
    isActive: true,
    createdAt: fromNowDays(-400),
    updatedAt: fromNowDays(-20),
    schedules: [
      {
        id: 'sch-3',
        locationId: 'loc-2',
        date: dateInDays(3),
        startTime: '10:00',
        endTime: '18:00',
        quota: 80,
        registeredCount: 57,
        createdAt: fromNowDays(-20),
        updatedAt: fromNowDays(-20),
      },
    ],
  },
]
