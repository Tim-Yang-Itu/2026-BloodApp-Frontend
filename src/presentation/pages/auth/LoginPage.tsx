import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import type { AuthFieldErrors } from '@/application/dto/auth.dto'
import { MIN_PASSWORD_LENGTH } from '@/application/use-cases/auth/auth-validation'
import { useAuth } from '@/presentation/hooks/use-auth'
import { AuthLayout } from '@/presentation/layouts/AuthLayout'
import { Alert, Button, TextField } from '@/presentation/components/ui'
import { clearFieldErrors, toFormErrorState } from '@/presentation/utils/form-error'
import { APP_NAME } from '@/shared/constants/app'
import { ROUTES, getHomeRouteForRole } from '@/shared/constants/routes'

interface LoginFormState {
  email: string
  password: string
}

const INITIAL_FORM: LoginFormState = { email: '', password: '' }

/**
 * Halaman login bersama untuk tiga peran — AU-01, AR-01, PD-03.
 * Setelah berhasil, pengguna diarahkan ke beranda sesuai perannya.
 */
export const LoginPage = () => {
  const { status, user, login, demoAccounts } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState<LoginFormState>(INITIAL_FORM)
  const [fieldErrors, setFieldErrors] = useState<AuthFieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  if (status === 'authenticated' && user) {
    return <Navigate to={getHomeRouteForRole(user.role)} replace />
  }

  const redirectTarget = (location.state as { from?: string } | null)?.from

  const updateForm = (patch: Partial<LoginFormState>): void => {
    setForm((current) => ({ ...current, ...patch }))
    setFieldErrors((current) => clearFieldErrors(current, Object.keys(patch)))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setFormError(null)
    setFieldErrors({})
    setIsSubmitting(true)

    try {
      const authenticatedUser = await login({ email: form.email, password: form.password })
      navigate(redirectTarget ?? getHomeRouteForRole(authenticatedUser.role), {
        replace: true,
      })
    } catch (error) {
      const nextState = toFormErrorState(error)
      setFieldErrors(nextState.fieldErrors)
      setFormError(nextState.formError)
    } finally {
      setIsSubmitting(false)
    }
  }

  const fillDemoAccount = (email: string, password: string): void => {
    setForm({ email, password })
    setFieldErrors({})
    setFormError(null)
  }

  return (
    <AuthLayout
      eyebrow={`Portal ${APP_NAME}`}
      title="Masuk ke dashboard Anda"
      description="Satu pintu untuk Admin UTD/PMI, Admin RS, dan pendonor. Data Anda dipisah per fasilitas dan per peran."
      footer={
        <p>
          Belum punya akun pendonor?{' '}
          <Link className="link" to={ROUTES.registerDonor}>
            Daftar sebagai pendonor
          </Link>
        </p>
      }
    >
      <div className="auth-card__body">
        <h2 className="auth-card__title">Masuk</h2>
        <p className="auth-card__subtitle">Gunakan email dan kata sandi yang terdaftar.</p>

        {formError ? (
          <Alert variant="error" title="Tidak dapat masuk">
            {formError}
          </Alert>
        ) : null}

        <form className="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nama@fasilitas.id"
            value={form.email}
            onChange={(event) => updateForm({ email: event.target.value })}
            error={fieldErrors.email}
            required
          />

          <TextField
            label="Kata sandi"
            name="password"
            type={isPasswordVisible ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder={`Minimal ${MIN_PASSWORD_LENGTH} karakter`}
            value={form.password}
            onChange={(event) => updateForm({ password: event.target.value })}
            error={fieldErrors.password}
            required
            trailing={
              <button
                type="button"
                className="field__toggle"
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                aria-label={
                  isPasswordVisible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'
                }
              >
                {isPasswordVisible ? 'Sembunyikan' : 'Lihat'}
              </button>
            }
          />

          <Button type="submit" fullWidth isLoading={isSubmitting}>
            {isSubmitting ? 'Memeriksa…' : 'Masuk'}
          </Button>
        </form>

        {demoAccounts.length > 0 ? (
          <div className="demo-accounts">
            <p className="demo-accounts__title">Akun demo (mode lokal)</p>
            <ul className="demo-accounts__list">
              {demoAccounts.map((account) => (
                <li key={account.email} className="demo-accounts__item">
                  <div>
                    <span className="demo-accounts__role">{account.role}</span>
                    <span className="demo-accounts__email">{account.email}</span>
                  </div>
                  <Button
                    variant="ghost"
                    className="btn--sm"
                    onClick={() => fillDemoAccount(account.email, account.password)}
                  >
                    Isi
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </AuthLayout>
  )
}
