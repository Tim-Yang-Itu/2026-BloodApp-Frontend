import { Route, Routes } from 'react-router-dom'

import { LoginPage, RegisterPage, RequireAuth, RequireRole } from '@/features/auth'
import { BloodRequestProvider } from '@/features/blood-request'
import { BloodStockProvider, StockPage } from '@/features/blood-stock'
import {
  DonorLocationDetailPage,
  DonorLocationProvider,
  DonorLocationsPage,
} from '@/features/donor-location'
import {
  DonorDashboardPage,
  DonorFormPage,
  DonorRegistrationProvider,
  MyTicketsPage,
  TicketDetailPage,
} from '@/features/donor-registration'
import { LandingPage } from '@/features/landing-page'
import { ROUTES } from '@/shared/constants/routes'

import { container } from '../container'
import { DonorLayout } from '../layouts/DonorLayout'
import { UtdLayout } from '../layouts/UtdLayout'
import { DonorScheduleDetailRoute } from '../pages/donor/DonorScheduleDetailRoute'
import { HospitalDashboardRoute } from '../pages/hospital/HospitalDashboardRoute'
import { NotFoundPage } from '../pages/public/NotFoundPage'
import { PublicLayout } from '../pages/public/PublicLayout'
import { UtdDashboardPage } from '../pages/utd/UtdDashboardPage'
import { UtdRequestsRoute } from '../pages/utd/UtdRequestsRoute'

/**
 * Peta rute aplikasi.
 *
 * Halaman yang berdiri sendiri diambil dari public API fiturnya
 * (`@/features/<fitur>`). Halaman gabungan beberapa fitur tinggal di
 * `src/app/pages/<peran>/`.
 */
export function AppRoutes() {
  return (
    <Routes>
      {/* Halaman autentikasi memakai layar penuh, tanpa footer publik. */}
      <Route element={<LoginPage />} path={ROUTES.login} />
      <Route element={<RegisterPage />} path={ROUTES.register} />

      {/*
       * RS-01: dashboard Admin RS hanya untuk peran `hospital`.
       * Tanpa guard, pengguna anonim bisa membuka halaman ini dan sesi yang
       * tertinggal membuat /login melempar balik ke sini (tampak seperti
       * "logout gagal").
       */}
      <Route
        element={
          <RequireRole role="hospital">
            <BloodStockProvider useCases={container.bloodStock}>
              <BloodRequestProvider useCases={container.bloodRequest}>
                <HospitalDashboardRoute />
              </BloodRequestProvider>
            </BloodStockProvider>
          </RequireRole>
        }
        path={ROUTES.hospitalDashboard}
      />

      {/*
       * PDN-04 → PDN-05 → PDN-06:
       * area pendonor hanya untuk pengguna yang sudah masuk. Pengguna anonim
       * dilempar ke login dengan query `redirect` sehingga kembali ke sini.
       */}
      <Route
        element={
          <RequireAuth>
            <DonorRegistrationProvider useCases={container.donorRegistration}>
              <DonorLayout />
            </DonorRegistrationProvider>
          </RequireAuth>
        }
      >
        <Route element={<DonorDashboardPage />} path={ROUTES.donorDashboard} />
        {/* Pencarian jadwal di dalam area pendonor, tanpa keluar ke halaman publik. */}
        <Route
          element={
            <DonorLocationProvider useCases={container.donorLocation}>
              <DonorLocationsPage embedded />
            </DonorLocationProvider>
          }
          path={ROUTES.donorSchedule}
        />
        <Route
          element={
            <DonorLocationProvider useCases={container.donorLocation}>
              <DonorScheduleDetailRoute />
            </DonorLocationProvider>
          }
          path={ROUTES.donorScheduleDetail}
        />
        <Route element={<DonorFormPage />} path={ROUTES.donorForm} />
        <Route element={<MyTicketsPage />} path={ROUTES.donorTickets} />
        <Route element={<TicketDetailPage />} path={ROUTES.donorTicketDetail} />
      </Route>

      {/*
       * UTD-01 → UTD-06: area UTD hanya untuk peran `utd`.
       * Stok & permintaan dibagikan lewat provider agar dashboard bisa
       * meringkas keduanya dalam satu kali render.
       */}
      <Route
        element={
          <RequireRole role="utd">
            <BloodStockProvider useCases={container.bloodStock}>
              <BloodRequestProvider useCases={container.bloodRequest}>
                <UtdLayout />
              </BloodRequestProvider>
            </BloodStockProvider>
          </RequireRole>
        }
      >
        <Route element={<UtdDashboardPage />} path={ROUTES.utdDashboard} />
        <Route element={<StockPage />} path={ROUTES.utdStock} />
        <Route element={<UtdRequestsRoute />} path={ROUTES.utdRequests} />
      </Route>

      {/* PDN-01/PDN-02/PDN-03: halaman publik, terbuka tanpa login. */}
      <Route element={<PublicLayout />}>
        <Route element={<LandingPage />} index />
        <Route
          element={
            <DonorLocationProvider useCases={container.donorLocation}>
              <DonorLocationsPage />
            </DonorLocationProvider>
          }
          path={ROUTES.donorLocations}
        />
        <Route
          element={
            <DonorLocationProvider useCases={container.donorLocation}>
              <DonorLocationDetailPage />
            </DonorLocationProvider>
          }
          path={ROUTES.donorLocationDetail}
        />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  )
}
