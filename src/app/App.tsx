import { AppProviders } from './providers/AppProviders'
import { AppRoutes } from './router/AppRoutes'

/**
 * Titik masuk UI.
 *
 * Rute tinggal di `src/app/router`, provider di `src/app/providers`, dan
 * halaman gabungan beberapa fitur di `src/app/pages/<peran>`.
 */
export function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  )
}

export default App
