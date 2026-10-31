import { Link } from 'react-router-dom'
import { useAuth } from '@/presentation/hooks/use-auth'
import { ROUTES, getHomeRouteForRole } from '@/shared/constants/routes'

/** Halaman 403: pengguna login tetapi perannya tidak berhak atas rute tersebut. */
export const ForbiddenPage = () => {
  const { user } = useAuth()

  return (
    <div className="status-page">
      <p className="status-page__code">403</p>
      <h1 className="status-page__title">Akses ditolak</h1>
      <p className="status-page__text">
        Akun Anda tidak memiliki izin untuk membuka halaman ini. Data dipisah per
        fasilitas dan per peran sesuai kebijakan akses.
      </p>
      <Link
        className="btn btn--primary"
        to={user ? getHomeRouteForRole(user.role) : ROUTES.home}
      >
        Kembali ke beranda
      </Link>
    </div>
  )
}
