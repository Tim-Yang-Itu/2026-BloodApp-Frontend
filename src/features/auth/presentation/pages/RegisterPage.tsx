import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'

import { Button, SelectField, TextField } from '@/shared/ui'

import { authErrorMessage } from '../../domain/errors/auth-error'
import { roleHomePath, safeRedirectPath } from '../../domain/rules/role-home'
import { AuthSplitLayout } from '../components/AuthSplitLayout'
import { AuthTabs } from '../components/AuthTabs'
import { useAuth } from '../hooks/use-auth'

type RegisterFormValues = {
  fullName: string
  email: string
  phone: string
  birthDate: string
  gender: '' | 'male' | 'female'
  bloodType: '' | 'A' | 'B' | 'AB' | 'O'
  rhesus: '' | 'positive' | 'negative'
  password: string
}

const INITIAL_VALUES: RegisterFormValues = {
  fullName: '',
  email: '',
  phone: '',
  birthDate: '',
  gender: '',
  bloodType: '',
  rhesus: '',
  password: '',
}

const GENDER_OPTIONS = [
  { value: '', label: 'Pilih' },
  { value: 'male', label: 'Laki-laki' },
  { value: 'female', label: 'Perempuan' },
] as const

const BLOOD_TYPE_OPTIONS = [
  { value: '', label: 'Belum tahu' },
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'AB', label: 'AB' },
  { value: 'O', label: 'O' },
] as const

const RHESUS_OPTIONS = [
  { value: '', label: 'Belum tahu' },
  { value: 'positive', label: 'Positif (+)' },
  { value: 'negative', label: 'Negatif (−)' },
] as const

/**
 * Halaman registrasi pendonor (PDN-04).
 * Akun langsung dipakai untuk sesi berjalan, jadi pengguna tidak perlu
 * login dua kali setelah mendaftar.
 */
export function RegisterPage() {
  const { user, isReady, registerDonor } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const redirectParam = searchParams.get('redirect')
  const loginHref = redirectParam
    ? `/login?redirect=${encodeURIComponent(redirectParam)}`
    : '/login'

  const [values, setValues] = useState<RegisterFormValues>(INITIAL_VALUES)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField<K extends keyof RegisterFormValues>(field: K, value: RegisterFormValues[K]) {
    setValues((previous) => ({ ...previous, [field]: value }))
    setError(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const created = await registerDonor({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        birthDate: values.birthDate,
        gender: values.gender === 'female' ? 'female' : 'male',
        bloodType: values.bloodType === '' ? null : values.bloodType,
        rhesus: values.rhesus === '' ? null : values.rhesus,
        password: values.password,
      })

      navigate(safeRedirectPath(redirectParam, roleHomePath(created.role)), { replace: true })
    } catch (caught) {
      setError(authErrorMessage(caught))
      setIsSubmitting(false)
    }
  }

  // Sudah login: jangan tampilkan form pendaftaran lagi.
  if (isReady && user) {
    return <Navigate replace to={safeRedirectPath(redirectParam, roleHomePath(user.role))} />
  }

  return (
    <AuthSplitLayout
      headline={
        <>
          Satu langkah lagi untuk jadi <span className="text-on-primary/90">pendonor.</span>
        </>
      }
      description="Buat akun sekali saja. Setelah itu kamu bisa mengisi form donor dan screening kesehatan dari rumah, lalu datang membawa tiket QR."
    >
      <AuthTabs active="register" />

      <header className="mt-8">
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-heading">
          Daftar sebagai pendonor
        </h2>
        <p className="mt-1.5 text-sm text-muted">
          Data ini dibutuhkan untuk tiket donor dan pengecekan rhesus.
        </p>
      </header>

      <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
        <TextField
          autoComplete="name"
          id="fullName"
          label="Nama lengkap"
          onChange={(event) => updateField('fullName', event.target.value)}
          placeholder="Sesuai KTP"
          required
          value={values.fullName}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            autoComplete="email"
            id="email"
            label="Email"
            onChange={(event) => updateField('email', event.target.value)}
            placeholder="mail@contoh.com"
            required
            type="email"
            value={values.email}
          />
          <TextField
            autoComplete="tel"
            id="phone"
            inputMode="tel"
            label="Nomor HP"
            onChange={(event) => updateField('phone', event.target.value)}
            pattern="[0-9+]*"
            placeholder="08xxxxxxxxxx"
            required
            type="tel"
            value={values.phone}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            id="birthDate"
            label="Tanggal lahir"
            max={new Date().toISOString().slice(0, 10)}
            onChange={(event) => updateField('birthDate', event.target.value)}
            required
            type="date"
            value={values.birthDate}
          />
          <SelectField
            id="gender"
            label="Jenis kelamin"
            onChange={(event) =>
              updateField('gender', event.target.value as RegisterFormValues['gender'])
            }
            options={GENDER_OPTIONS}
            required
            value={values.gender}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            id="bloodType"
            label="Golongan darah"
            onChange={(event) =>
              updateField('bloodType', event.target.value as RegisterFormValues['bloodType'])
            }
            options={BLOOD_TYPE_OPTIONS}
            value={values.bloodType}
          />
          <SelectField
            id="rhesus"
            label="Rhesus"
            onChange={(event) =>
              updateField('rhesus', event.target.value as RegisterFormValues['rhesus'])
            }
            options={RHESUS_OPTIONS}
            value={values.rhesus}
          />
        </div>

        <TextField
          autoComplete="new-password"
          hint="Minimal 8 karakter."
          id="password"
          label="Password"
          minLength={8}
          onChange={(event) => updateField('password', event.target.value)}
          placeholder="••••••••"
          required
          type="password"
          value={values.password}
        />

        <Button className="mt-2" disabled={isSubmitting} fullWidth type="submit">
          {isSubmitting ? 'Membuat akun…' : 'Daftar dan dapatkan akses akun'}
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
      </form>

      <p className="mt-6 text-center text-xs text-muted">
        Sudah punya akun?{' '}
        <Link className="font-semibold text-primary hover:underline" to={loginHref}>
          Masuk di sini
        </Link>
        .
      </p>
    </AuthSplitLayout>
  )
}

export default RegisterPage
