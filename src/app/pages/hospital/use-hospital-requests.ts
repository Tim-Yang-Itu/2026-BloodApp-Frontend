import { useMemo } from 'react'

import { useAuth } from '@/features/auth'
import { useBloodRequests } from '@/features/blood-request'

/**
 * Permintaan darah milik rumah sakit pengguna aktif.
 *
 * Admin RS hanya boleh melihat pengajuan rumah sakitnya sendiri, jadi seluruh
 * halaman area RS memakai hook ini alih-alih `useBloodRequests` mentah.
 * Tanpa identitas rumah sakit, daftar sengaja dikosongkan agar pengajuan RS
 * lain tidak ikut tampil.
 */
export function useHospitalRequests() {
  const { user } = useAuth()
  const bloodRequests = useBloodRequests()
  const hospitalName = user?.hospitalName ?? null

  const requests = useMemo(
    () =>
      hospitalName
        ? bloodRequests.requests.filter((request) => request.hospitalName === hospitalName)
        : [],
    [bloodRequests.requests, hospitalName],
  )

  return { ...bloodRequests, requests, hospitalName }
}
