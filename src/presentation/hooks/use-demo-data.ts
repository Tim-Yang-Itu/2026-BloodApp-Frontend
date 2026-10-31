import { useContext } from 'react'
import type { DemoData } from '@/presentation/contexts/demo-data-context'
import { DemoDataContext } from '@/presentation/contexts/demo-data-context'

/** Mengambil data tampilan contoh; error bila dipakai di luar provider. */
export const useDemoData = (): DemoData => {
  const value = useContext(DemoDataContext)

  if (!value) {
    throw new Error('useDemoData harus dipakai di dalam DemoDataProvider.')
  }

  return value
}
