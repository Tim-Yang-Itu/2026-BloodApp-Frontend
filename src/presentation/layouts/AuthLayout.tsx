import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { APP_NAME } from '@/shared/constants/app'
import { ROUTES } from '@/shared/constants/routes'

interface AuthLayoutProps {
  readonly eyebrow: string
  readonly title: string
  readonly description: string
  readonly children: ReactNode
  readonly footer: ReactNode
}

/**
 * Kerangka dua kolom untuk halaman masuk & daftar.
 * Kolom kiri memuat pesan nilai platform, kolom kanan berisi form.
 */
export const AuthLayout = ({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthLayoutProps) => (
  <div className="auth-layout">
    <aside className="auth-layout__aside">
      <Link className="brand brand--light" to={ROUTES.home}>
        <span className="brand__mark" aria-hidden="true">
          +
        </span>
        <span className="brand__name">{APP_NAME}</span>
      </Link>

      <div className="auth-layout__copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="auth-layout__title">{title}</h1>
        <p className="auth-layout__description">{description}</p>
      </div>

      <ul className="auth-layout__points">
        <li>Data pendonor dan hasil screening dienkripsi.</li>
        <li>Tidak ada jual-beli darah dalam bentuk apa pun.</li>
        <li>Akses dashboard dipisah per fasilitas dan per peran.</li>
      </ul>
    </aside>

    <main className="auth-layout__main">
      <div className="auth-card">
        <div className="auth-card__header">
          <Link className="brand brand--mobile" to={ROUTES.home}>
            <span className="brand__mark" aria-hidden="true">
              +
            </span>
            <span className="brand__name">{APP_NAME}</span>
          </Link>
        </div>

        {children}

        <div className="auth-card__footer">{footer}</div>
      </div>
    </main>
  </div>
)
