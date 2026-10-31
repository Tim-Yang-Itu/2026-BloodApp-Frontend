import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import type { AuthFieldErrors, RegisterDonorInput } from '@/application/dto/auth.dto'
import { MIN_PASSWORD_LENGTH } from '@/application/use-cases/auth/auth-validation'
import { BLOOD_GROUPS, RHESUS_TYPES } from '@/domain/enums/blood'
import { useAuth } from '@/presentation/hooks/use-auth'
import { AuthLayout } from '@/presentation/layouts/AuthLayout'
import { Alert, Button, SelectField, TextField } from '@/presentation/components/ui'
import { clearFieldErrors, toFormErrorState } from '@/presentation/utils/form-error'
import { APP_NAME } from '@/shared/constants/app'
import { RHESUS_LABELS } from '@/shared/constants/labels'
import { ROUTES, getHomeRouteForRole } from '@/shared/constants/routes'

const BLOOD_GROUP_OPTIONS = BLOOD_GROUPS.map((group) => ({ value: group, label: group }))
const RHESUS_OPTIONS = RHESUS_TYPES.map((rhesus) => ({
  value: rhesus,
  label: RHESUS_LABELS[rhesus],
}))

interface RegisterFormState extends RegisterDonorInput {
  readonly consent: boolean
}

const INITIAL_FORM: RegisterFormState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  nik: '',
  bloodGroup: '',
  rhesus: '',
  phone: '',
  address: '',
  consent: false,
}

/**
 * Registrasi pendonor — PD-03.
 * NIK dikirim melalui HTTPS lalu dienkripsi di server (UU 27/2022).
 */
export const RegisterDonorPage = () => {
  const { status, user, registerDonor } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState<RegisterFormState>(INITIAL_FORM)
  const [fieldErrors, setFieldErrors] = useState<AuthFieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (status === 'authenticated' && user) {
    return <Navigate to={getHomeRouteForRole(user.role)} replace />
  }

  const updateForm = (patch: Partial<RegisterFormState>): void => {
    setForm((current) => ({ ...current, ...patch }))
    setFieldErrors((current) => clearFieldErrors(current, Object.keys(patch)))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setFormError(null)

    if (!form.consent) {
      setFormError('Anda perlu menyetujui pemrosesan data sebelum mendaftar.')
      return
    }

    setFieldErrors({})
    setIsSubmitting(true)

    const input: RegisterDonorInput = {
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      nik: form.nik,
      bloodGroup: form.bloodGroup,
      rhesus: form.rhesus,
      phone: form.phone,
      address: form.address,
    }

    try {
      const authenticatedUser = await registerDonor(input)
      navigate(getHomeRouteForRole(authenticatedUser.role), { replace: true })
    } catch (error) {
      const nextState = toFormErrorState(error)
      setFieldErrors(nextState.fieldErrors)
      setFormError(nextState.formError)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Pendaftaran pendonor"
      title="Mulai perjalanan donor Anda"
      description={`Buat akun ${APP_NAME} untuk mengisi form donor, menjalani screening, dan menerima tiket digital berisi QR Code.`}
      footer={
        <p>
          Sudah punya akun?{' '}
          <Link className="link" to={ROUTES.login}>
            Masuk di sini
          </Link>
        </p>
      }
    >
      <div className="auth-card__body">
        <h2 className="auth-card__title">Daftar sebagai pendonor</h2>
        <p className="auth-card__subtitle">
          Lengkapi data diri sesuai KTP. Data kesehatan Anda dilindungi.
        </p>

        {formError ? (
          <Alert variant="error" title="Pendaftaran belum bisa diproses">
            {formError}
          </Alert>
        ) : null}

        <form className="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Nama lengkap"
            name="fullName"
            autoComplete="name"
            placeholder="Sesuai KTP"
            value={form.fullName}
            onChange={(event) => updateForm({ fullName: event.target.value })}
            error={fieldErrors.fullName}
            required
          />

          <div className="form__grid form__grid--two">
            <TextField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="nama@email.com"
              value={form.email}
              onChange={(event) => updateForm({ email: event.target.value })}
              error={fieldErrors.email}
              required
            />

            <TextField
              label="Nomor WhatsApp"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="08123456789"
              value={form.phone}
              onChange={(event) => updateForm({ phone: event.target.value })}
              error={fieldErrors.phone}
              required
            />
          </div>

          <TextField
            label="NIK"
            name="nik"
            inputMode="numeric"
            autoComplete="off"
            placeholder="16 digit sesuai KTP"
            hint="NIK disimpan terenkripsi dan tidak ditampilkan ke publik."
            value={form.nik}
            onChange={(event) => updateForm({ nik: event.target.value })}
            error={fieldErrors.nik}
            maxLength={16}
            required
          />

          <div className="form__grid form__grid--two">
            <SelectField
              label="Golongan darah"
              name="bloodGroup"
              options={BLOOD_GROUP_OPTIONS}
              placeholder="Pilih golongan"
              value={form.bloodGroup}
              onChange={(event) =>
                updateForm({ bloodGroup: event.target.value as RegisterFormState['bloodGroup'] })
              }
              error={fieldErrors.bloodGroup}
              required
            />

            <SelectField
              label="Rhesus"
              name="rhesus"
              options={RHESUS_OPTIONS}
              placeholder="Pilih rhesus"
              value={form.rhesus}
              onChange={(event) =>
                updateForm({ rhesus: event.target.value as RegisterFormState['rhesus'] })
              }
              error={fieldErrors.rhesus}
              required
            />
          </div>

          <div className="form__grid form__grid--two">
            <TextField
              label="Kata sandi"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder={`Minimal ${MIN_PASSWORD_LENGTH} karakter`}
              value={form.password}
              onChange={(event) => updateForm({ password: event.target.value })}
              error={fieldErrors.password}
              required
            />

            <TextField
              label="Ulangi kata sandi"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Ketik ulang kata sandi"
              value={form.confirmPassword}
              onChange={(event) => updateForm({ confirmPassword: event.target.value })}
              error={fieldErrors.confirmPassword}
              required
            />
          </div>

          <TextField
            label="Alamat domisili"
            name="address"
            autoComplete="street-address"
            placeholder="Jalan, kelurahan, kota (opsional)"
            value={form.address}
            onChange={(event) => updateForm({ address: event.target.value })}
            error={fieldErrors.address}
          />

          <label className="checkbox">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(event) => updateForm({ consent: event.target.checked })}
            />
            <span>
              Saya menyetujui data pribadi dan data kesehatan saya diproses untuk keperluan
              donor darah sesuai UU 27/2022.
            </span>
          </label>

          <Button type="submit" fullWidth isLoading={isSubmitting}>
            {isSubmitting ? 'Mendaftarkan…' : 'Daftar dan lanjutkan'}
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}
