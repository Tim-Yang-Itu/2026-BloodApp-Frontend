import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, PasswordField, TextField } from '@/shared/ui'

import { AuthSplitLayout } from '../components/AuthSplitLayout'
import { AuthTabs } from '../components/AuthTabs'

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
 * Integrasi use case `login` belum tersedia, jadi submit baru memvalidasi form.
 */
export function LoginPage() {
  const [values, setValues] = useState<LoginFormValues>(INITIAL_VALUES)
  const [isSubmitted, setIsSubmitted] = useState(false)

  function updateField<K extends keyof LoginFormValues>(field: K, value: LoginFormValues[K]) {
    setValues((previous) => ({ ...previous, [field]: value }))
    setIsSubmitted(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitted(true)
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

        <Button className="mt-2" fullWidth type="submit">
          Masuk
        </Button>

        {isSubmitted ? (
          <p
            aria-live="polite"
            className="rounded-lg border border-primary-200 bg-primary-50 px-4 py-3 text-xs leading-relaxed text-primary-800"
          >
            Form sudah valid. Integrasi API login (PDN-04, UTD-01, RS-01) belum aktif, jadi sesi
            belum dibuat.
          </p>
        ) : null}
      </form>

      <p className="mt-6 text-center text-xs text-muted">
        Belum punya akun?{' '}
        <Link className="font-semibold text-primary hover:underline" to="/register">
          Daftar sebagai pendonor
        </Link>
        .
      </p>
    </AuthSplitLayout>
  )
}

export default LoginPage
