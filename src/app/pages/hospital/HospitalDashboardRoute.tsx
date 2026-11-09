import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/features/auth'

import { HospitalDashboardPage } from './HospitalDashboardPage'

/**
 * Rute dashboard Admin RS.
 *
 * Menyambungkan halaman dengan sesi `auth`: tombol Keluar di sidebar harus
 * benar-benar mengakhiri sesi (bukan hanya berpindah halaman), kalau tidak
 * pengguna akan langsung dilempar balik ke dashboard saat membuka `/login`.
 */
export function HospitalDashboardRoute() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    void logout()
    navigate('/login', { replace: true })
  }

  return <HospitalDashboardPage onLogout={handleLogout} />
}
