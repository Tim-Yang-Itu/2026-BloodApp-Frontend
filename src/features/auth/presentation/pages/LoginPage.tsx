import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'

import { Button, PasswordField, TextField } from '@/shared/ui'

import { authErrorMessage } from '../../domain/errors/auth-error'
import { roleHomePath, safeRedirectPath } from '../../domain/rules/role-home'
import { AuthSplitLayout } from '../components/AuthSplitLayout'
import { AuthTabs } from '../components/AuthTabs'
import { useAuth } from '../hooks/use-auth'

type LoginFormValues = {
  email: string
  password: string
  rememberMe: boolean
}

const INITIAL_VALUES: LoginFormValues = {
  email: '',
  password: '',
  rememberMe: false,
}

/**
 * Halaman masuk (PDN-04 / UTD-01 / RS-01).
 * Satu pintu untuk pendonor maupun admin UTD/RS — peran diambil dari akun.
 * Setelah berhasil, pengguna dikembalikan ke `?redirect=` (mis. form donor yang
 * dipilih dari halaman lokasi) atau ke beranda sesuai perannya.
 */
export function LoginPage() {
  const { user, isReady, login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const redirectParam = searchParams.get('redirect')
  const registerHref = redirectParam
    ? `/register?redirect=${encodeURIComponent(redirectParam)}`
    : '/register'

  const [values, setValues] = useState<LoginFormValues>(INITIAL_VALUES)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField<K extends keyof LoginFormValues>(field: K, value: LoginFormValues[K]) {
    setValues((previous) => ({ ...previous, [field]: value }))
    setError(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const signedIn = await login({ email: values.email, password: values.password })
      navigate(safeRedirectPath(redirectParam, roleHomePath(signedIn.role)), { replace: true })
    } catch (caught) {
      setError(authErrorMessage(caught))
      setIsSubmitting(false)
    }
  }

  // Sudah login (mis. membuka /login dari tautan lama): langsung lanjut.
  if (isReady && user) {
    return <Navigate replace to={safeRedirectPath(redirectParam, roleHomePath(user.role))} />
  }

  return (
    <AuthSplitLayout
      headline="Selamat datang kembali."
      description="Masuk untuk melanjutkan donor, melihat tiket QR, atau mengelola stok dan permintaan darah."
    >
      <AuthTabs active="login" />

      <header className="mt-8">
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-heading">Masuk ke akunmu</h2>
        <p className="mt-1.5 text-sm text-muted">
          Gunakan email dan password yang kamu daftarkan.
        </p>
      </header>

      <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
        <TextField
          autoComplete="email"
          autoFocus
          id="email"
          label="Email"
          onChange={(event) => updateField('email', event.target.value)}
          placeholder="nama@email.com"
          required
          type="email"
          value={values.email}
        />

        <PasswordField
          autoComplete="current-password"
          id="password"
          label="Password"
          onChange={(event) => updateField('password', event.target.value)}
          placeholder="Password kamu"
          required
          value={values.password}
        />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-label" htmlFor="rememberMe">
            <input
              checked={values.rememberMe}
              className="size-3.5 cursor-pointer rounded-sm border-border accent-primary"
              id="rememberMe"
              onChange={(event) => updateField('rememberMe', event.target.checked)}
              type="checkbox"
            />
            Ingat saya
          </label>
          <Link className="text-xs font-semibold text-primary hover:underline" to="/lupa-password">
            Lupa password?
          </Link>
        </div>

        <Button className="mt-2" disabled={isSubmitting} fullWidth type="submit">
          {isSubmitting ? 'Memeriksa akun…' : 'Masuk'}
        </Button>

        {error ? (
          <p
            aria-live="polite"
            className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-xs leading-relaxed text-danger"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <p className="rounded-lg border border-border bg-surface-muted px-4 py-3 text-[11px] leading-relaxed text-muted">
          Akun demo: <strong className="text-foreground">nabila@donorku.id</strong> dengan password{' '}
          <strong className="text-foreground">password123</strong>.
        </p>
      </form>

      <p className="mt-6 text-center text-xs text-muted">
        Belum punya akun?{' '}
        <Link className="font-semibold text-primary hover:underline" to={registerHref}>
          Daftar sebagai pendonor
        </Link>
        .
      </p>
    </AuthSplitLayout>
  )
}

export default LoginPage
