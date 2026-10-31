import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'

/** Halaman 404 untuk rute yang tidak dikenal. */
export const NotFoundPage = () => (
  <div className="status-page">
    <p className="status-page__code">404</p>
    <h1 className="status-page__title">Halaman tidak ditemukan</h1>
    <p className="status-page__text">
      Tautan yang Anda buka mungkin sudah berubah atau tidak pernah ada.
    </p>
    <Link className="btn btn--primary" to={ROUTES.home}>
      Kembali ke beranda
    </Link>
  </div>
)
