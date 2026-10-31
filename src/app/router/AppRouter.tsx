import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RequireAuth, RequireRole } from '@/app/router/guards'
import { LoginPage } from '@/presentation/pages/auth/LoginPage'
import { RegisterDonorPage } from '@/presentation/pages/auth/RegisterDonorPage'
import { DonorDashboardPage } from '@/presentation/pages/donor/DonorDashboardPage'
import { HospitalDashboardPage } from '@/presentation/pages/hospital/HospitalDashboardPage'
import { ForbiddenPage } from '@/presentation/pages/public/ForbiddenPage'
import { LandingPage } from '@/presentation/pages/public/LandingPage'
import { NotFoundPage } from '@/presentation/pages/public/NotFoundPage'
import { UtdDashboardPage } from '@/presentation/pages/utd/UtdDashboardPage'
import { ROUTES } from '@/shared/constants/routes'

/**
 * Peta rute aplikasi.
 * Portal per peran dilindungi `RequireRole` sehingga tiap peran hanya
 * bisa membuka berandanya sendiri.
 */
export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.home} element={<LandingPage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.registerDonor} element={<RegisterDonorPage />} />

      <Route
        path={ROUTES.donorDashboard}
        element={
          <RequireRole roles={['donor']}>
            <DonorDashboardPage />
          </RequireRole>
        }
      />
      <Route
        path={ROUTES.utdDashboard}
        element={
          <RequireRole roles={['utd_admin']}>
            <UtdDashboardPage />
          </RequireRole>
        }
      />
      <Route
        path={ROUTES.hospitalDashboard}
        element={
          <RequireRole roles={['hospital_admin']}>
            <HospitalDashboardPage />
          </RequireRole>
        }
      />

      <Route
        path={ROUTES.forbidden}
        element={
          <RequireAuth>
            <ForbiddenPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
)
