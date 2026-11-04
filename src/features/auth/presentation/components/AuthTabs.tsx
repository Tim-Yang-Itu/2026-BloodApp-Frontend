import { Link } from 'react-router-dom'

export type AuthTab = 'login' | 'register'

const TAB_BASE =
  'rounded-lg py-2 text-center text-sm font-semibold no-underline transition-colors'
const TAB_ACTIVE = `${TAB_BASE} bg-surface text-primary shadow-field`
const TAB_IDLE = `${TAB_BASE} text-muted hover:text-foreground`

const TABS: readonly { tab: AuthTab; label: string; to: string }[] = [
  { tab: 'register', label: 'Daftar', to: '/register' },
  { tab: 'login', label: 'Masuk', to: '/login' },
]

type AuthTabsProps = {
  active: AuthTab
}

/**
 * Tab berpindah antara halaman daftar dan masuk.
 * Tab yang aktif tidak bisa diklik (ditampilkan sebagai teks biasa).
 */
export function AuthTabs({ active }: AuthTabsProps) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-surface-muted p-1">
      {TABS.map((item) =>
        item.tab === active ? (
          <span aria-current="page" className={TAB_ACTIVE} key={item.tab}>
            {item.label}
          </span>
        ) : (
          <Link className={TAB_IDLE} key={item.tab} to={item.to}>
            {item.label}
          </Link>
        ),
      )}
    </div>
  )
}
