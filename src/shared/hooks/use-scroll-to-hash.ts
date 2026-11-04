import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Menggulir ke elemen yang dituju `location.hash` setelah navigasi SPA, dan
 * mengembalikan posisi gulir ke atas saat pindah halaman tanpa hash.
 *
 * Browser hanya menggulir otomatis saat hash ada di URL loading awal, jadi
 * navigasi seperti `/lokasi-donor` -> `/#cara-donor` perlu ditangani manual.
 * Elemen target bisa saja belum ter-render pada efek pertama, karena itu
 * pencarian diulang beberapa frame sebelum menyerah.
 */
export function useScrollToHash() {
  const { hash, pathname, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    const targetId = decodeURIComponent(hash.slice(1))
    let frame = 0
    let attempts = 0

    const scrollToTarget = () => {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      attempts += 1
      if (attempts < 40) {
        frame = requestAnimationFrame(scrollToTarget)
      }
    }

    frame = requestAnimationFrame(scrollToTarget)
    return () => cancelAnimationFrame(frame)
  }, [hash, pathname, key])
}

export default useScrollToHash
