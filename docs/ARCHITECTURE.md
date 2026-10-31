# Arsitektur DarahTerpadu (Frontend)

Frontend **React 19 + TypeScript + Vite** dengan pendekatan **Feature-based Clean Architecture**:
kode dipecah per **fitur bisnis** (vertical slice), dan setiap fitur memiliki **empat lapisan**
clean architecture di dalamnya. Struktur ini diturunkan dari `PRD_DarahTerpadu_MVP_Sesuai_Alur.docx`.

> **Status repositori:** masih kerangka. Yang sudah ada: `src/main.tsx`, `src/app/App.tsx`
> (shell + rute placeholder), `src/shared/styles/global.css`, `index.ts` (public API kosong)
> di tiap fitur, dan folder lapisan bertanda `.gitkeep`. Belum ada use case, repository,
> maupun halaman fitur.

## 1. Prinsip

Ada dua sumbu pemisahan, dan keduanya dipakai bersamaan:

1. **Sumbu fitur (vertical slice)** — satu folder `src/features/<fitur>/` berisi seluruh kode
   untuk satu kemampuan bisnis, dari entitas sampai halaman. Menambah/menghapus fitur berarti
   menambah/menghapus satu folder, bukan menyentuh folder global.
2. **Sumbu lapisan (clean architecture)** — di dalam setiap fitur, dependensi hanya boleh
   mengarah ke dalam:

```
presentation  ──►  application  ──►  domain
      │                 │               ▲
      └──►  infrastructure ──────────────┘
                  │
              shared/ (kernel)
```

**Aturan dependensi (dalam satu fitur):**

- `domain` tidak mengimpor apa pun selain `shared/` — tanpa React, tanpa browser API.
- `application` hanya mengimpor `domain` (fitur sendiri) dan `shared/`.
- `infrastructure` mengimplementasikan kontrak `domain/repositories` & `application/ports`.
- `presentation` hanya memanggil use case dari `application` (fitur sendiri) + `shared/ui`.
- `app` adalah composition root: merakit provider, router, layout, dan container.
- `shared` adalah kernel bebas dependensi: tidak mengimpor `features/` maupun `app/`.

**Aturan antar fitur (horizontal):**

- Fitur **tidak boleh** mengimpor ke dalam lapisan fitur lain
  (`features/donor/application/...` ❌).
- Komunikasi antar fitur hanya lewat **public API** `features/<fitur>/index.ts` ✅.
- Bila sebuah konsep dipakai ≥ 2 fitur dan tidak punya perilaku bisnis kaya, pindahkan ke
  `shared/` (mis. `shared/domain/blood-type.ts`).
- Halaman yang menggabungkan beberapa fitur (dashboard) diletakkan di `src/app/pages/`,
  bukan di dalam salah satu fitur.

## 2. Struktur folder

```
src/
├─ main.tsx                    # bootstrap React (StrictMode + createRoot)
│
├─ app/                        # composition root — bukan fitur
│  ├─ App.tsx                  # shell aplikasi: BrowserRouter + layout + rute
│  ├─ container.ts             # (rencana) merakit container seluruh fitur
│  ├─ layouts/                 # kerangka halaman lintas fitur (AuthLayout, DashboardLayout)
│  ├─ providers/               # komposisi React Context global (Auth, DemoData)
│  └─ router/                  # peta rute + guard per peran
│
├─ features/                   # satu folder = satu fitur bisnis
│  ├─ auth/
│  │  ├─ index.ts              # public API fitur — satu-satunya pintu masuk
│  │  ├─ domain/
│  │  ├─ application/
│  │  ├─ infrastructure/
│  │  └─ presentation/
│  ├─ blood-stock/             # struktur sama dengan auth
│  ├─ blood-request/
│  ├─ donor/
│  ├─ donor-location/
│  └─ notification/
│
└─ shared/                     # kernel, tanpa dependensi ke features/app
   ├─ domain/                  # value object lintas fitur (BloodType, UserRole, FacilityType)
   ├─ types/                   # tipe primitif (EntityId, IsoDateTime, Result)
   ├─ constants/               # konstanta aplikasi, daftar rute, label
   ├─ utils/                   # util murni (format tanggal, dsb.)
   ├─ ui/                      # design system: Button, TextField, Select, Badge
   └─ styles/global.css        # design token + kelas utilitas
```

> Subfolder di dalam sebuah lapisan dibuat **saat berkas pertama ditambahkan** (agar repositori
> tidak penuh folder kosong). Struktur di bawah adalah konvensi penempatan, bukan folder wajib.

## 3. Anatomi satu fitur

Contoh `src/features/blood-stock/` setelah fitur diimplementasikan:

```
features/blood-stock/
├─ index.ts                          # public API: ekspor use case + tipe + halaman rute
│
├─ domain/                           # tidak tahu React / HTTP / storage
│  ├─ entities/blood-bag.ts          # BloodBag
│  ├─ enums/blood.ts                 # BloodType, BloodComponent, BloodTestStatus
│  ├─ errors/blood-bag-error.ts      # error domain spesifik fitur
│  ├─ repositories/blood-bag-repository.ts   # interface
│  └─ rules/stock.ts                 # isBagUsable, daysUntilExpiry, getStockLevel
│
├─ application/                      # orkestrasi bisnis
│  ├─ dto/blood-bag.dto.ts           # input/output use case
│  ├─ ports/clock-port.ts            # kontrak layanan eksternal (bila perlu)
│  └─ use-cases/
│     ├─ create-blood-bag.use-case.ts
│     ├─ list-stock.use-case.ts
│     └─ get-availability.use-case.ts
│
├─ infrastructure/                   # detail teknis
│  ├─ repositories/in-memory-blood-bag-repository.ts
│  ├─ mappers/blood-bag.mapper.ts
│  ├─ demo/demo-blood-bags.ts        # fixture data contoh
│  └─ container.ts                   # perakitan dependensi fitur ini
│
└─ presentation/                     # UI
   ├─ pages/StockPage.tsx
   ├─ components/StockGrid.tsx
   ├─ hooks/use-stock.ts
   └─ contexts/                       # hanya bila butuh state fitur
```

### Tanggung jawab per lapisan

| Lapisan | Isi | Tidak boleh |
| --- | --- | --- |
| `domain` | entity, union status, error domain, interface repository, aturan bisnis murni | impor React, `window`/`localStorage`, `fetch`, library UI |
| `application` | use case (satu kelas/fungsi = satu aksi), port, DTO | menyentuh DOM atau detail penyimpanan |
| `infrastructure` | implementasi repository/port, mapper, fixture demo, `container.ts` | mengimpor `presentation` |
| `presentation` | page, component, hook, context fitur | memanggil `fetch`/storage langsung, mengimpor `infrastructure` |
| `shared` | value object lintas fitur, tipe primitif, konstanta, util, design system | mengimpor `features/` atau `app/` |

## 4. Aturan impor

| Dari | Boleh mengimpor | Dilarang |
| --- | --- | --- |
| `features/x/domain` | `shared/domain`, `shared/types` | React, `features/x/application`, `features/x/infrastructure`, fitur lain |
| `features/x/application` | `features/x/domain`, `shared/*` | React, `features/x/infrastructure`, `features/x/presentation`, fitur lain |
| `features/x/infrastructure` | `features/x/domain`, `features/x/application`, `shared/*` | `features/x/presentation`, fitur lain |
| `features/x/presentation` | `features/x/domain` (tipe), `features/x/application` (use case), `shared/ui`, `shared/styles` | `features/x/infrastructure`, fitur lain |
| `src/app` | `features/<x>` (public API), `shared/*` | path dalam lapisan fitur (`features/x/domain/...`) |
| `shared` | hanya `shared` | `features/*`, `app/*` |

Contoh yang benar:

```ts
// ✅ dari halaman ke use case pada fitur yang sama
import { listStock } from '@/features/blood-stock'

// ✅ dari fitur lain lewat public API
import { restoreSession } from '@/features/auth'
```

Contoh yang salah:

```ts
// ❌ menembus lapisan & batas fitur
import { InMemoryBloodBagRepository } from '@/features/blood-stock/infrastructure/repositories/in-memory-blood-bag-repository'

// ❌ presentation bergantung pada implementasi
import { bloodBagRepository } from '@/features/blood-stock/infrastructure/container'
```

## 5. Pemetaan fitur PRD → feature slice

| ID | Fitur PRD | Feature slice | Application (use case) | Presentation |
| --- | --- | --- | --- | --- |
| AU-01 | Login pengguna | `auth` | `login.use-case` | `pages/LoginPage` |
| PD-03 | Registrasi pendonor | `auth` | `register-donor.use-case` | `pages/RegisterDonorPage` |
| AU-02 | Input kantong darah | `blood-stock` | `create-blood-bag.use-case` | `pages/utd/BloodBagFormPage` |
| AU-03, EX-01 | Stok & kedaluwarsa | `blood-stock` | `list-stock.use-case` | `pages/utd/StockPage` |
| AR-02, EX-05 | Ketersediaan stok | `blood-stock` | `get-availability.use-case` | `pages/hospital/AvailabilityPage`, `pages/public/HomePage` |
| AU-04..AU-06 | Request masuk UTD | `blood-request` | `verify-request.use-case`, `reject-request.use-case` | `pages/utd/RequestsPage` |
| AR-03..AR-06 | Pengajuan request RS | `blood-request` | `create-request.use-case`, `list-requests.use-case` | `pages/hospital/*` |
| PD-04 | Screening kesehatan | `donor` | `submit-screening.use-case` | `pages/donor/ScreeningPage` |
| PD-05, EX-03 | Tiket QR & daftar hadir | `donor` | `issue-ticket.use-case`, `scan-ticket.use-case` | `pages/donor/TicketPage`, `pages/utd/ScanPage` |
| EX-04 | Interval & riwayat donor | `donor` | `get-donation-history.use-case` | `pages/donor/HistoryPage` |
| PD-01, PD-02 | Lokasi & jadwal donor | `donor-location` | `list-locations.use-case`, `list-schedules.use-case` | `pages/public/LocationsPage` |
| EX-02 | Kelola lokasi/jadwal | `donor-location` | `create-location.use-case`, `update-schedule.use-case` | `pages/utd/LocationsPage` |
| — | Notifikasi status | `notification` | `notify-request-status.use-case` | `components/NotificationBell` |

## 6. Composition root & wiring

Dependensi nyata dirakit di luar lapisan domain/application, dari bawah ke atas:

```
features/<fitur>/infrastructure/container.ts   # rakit repository + use case fitur
        │
        ▼
src/app/container.ts                           # gabungkan container tiap fitur
        │
        ▼
src/app/providers/*                            # masukkan ke React Context
        │
        ▼
features/<fitur>/presentation/hooks/*          # konsumsi lewat hook
        │
        ▼
features/<fitur>/presentation/pages/*          # render UI
```

- `presentation` **tidak pernah** menyusun dependensi sendiri; ia menerima use case dari hook.
- Saat backend tersedia: tambahkan `infrastructure/repositories/http-*.ts` pada fitur terkait,
  lalu tukar implementasinya di `container.ts` fitur tersebut. Lapisan lain tidak berubah.
- `src/app/router/AppRouter.tsx` memetakan rute ke halaman yang diekspor `features/<x>/index.ts`;
  guard per peran ada di `src/app/router/guards.tsx`.

## 7. Konvensi teknis

1. **Nama berkas** `kebab-case.ts`. Komponen React tetap `PascalCase` untuk nama ekspor.
2. **Tanpa `enum`** — `tsconfig` memakai `erasableSyntaxOnly`; gunakan `as const` + union type.

   ```ts
   export const BLOOD_TYPES = ['A', 'B', 'AB', 'O'] as const
   export type BloodType = (typeof BLOOD_TYPES)[number]
   ```

3. **`import type`** untuk semua impor tipe (`verbatimModuleSyntax`).
4. **Alias impor** `@/*` → `src/*` (dikonfigurasi di `tsconfig.app.json` dan `vite.config.ts`).
5. **Waktu** diambil dari port `Clock`, bukan `new Date()` di komponen (agar bisa diuji & stabil).
6. **Data sensitif** (NIK, hasil screening) hanya lewat `CryptoPort`, tidak pernah di `localStorage`
   atau URL.
7. **Styling**: satu berkas `shared/styles/global.css`, kelas BEM-ish, tanpa CSS module/framework.
8. **Bahasa UI** Indonesia; format tanggal lewat `shared/utils/format-date.ts`.
9. **Aturan bisnis** ditulis sebagai fungsi murni di `domain/rules/` agar bisa diuji tanpa React.

## 8. Status & langkah berikutnya

Sudah ada:

- `src/main.tsx` — bootstrap React + impor `@/shared/styles/global.css`.
- `src/app/App.tsx` — shell (header/nav/footer), `BrowserRouter`, rute `/` dan `/status`.
- `src/shared/styles/global.css` — design token + kelas dasar.
- `src/features/<fitur>/index.ts` — public API kosong sebagai penanda batas fitur.
- Folder `app/`, `features/*/{domain,application,infrastructure,presentation}`, `shared/*`
  dengan `.gitkeep`.

Langkah berikutnya yang disarankan:

1. **`auth`** — entity `User`, `AuthRepository`, `login`/`logout`/`restore-session` use case,
   `in-memory-auth-repository` + fixture akun demo, `AuthProvider`, `LoginPage`.
2. **`app`** — `container.ts`, `router/AppRouter.tsx`, `router/guards.tsx`, `layouts/*`.
3. **`shared`** — `domain/blood-type.ts`, `types/common.ts`, `constants/routes.ts`,
   `utils/format-date.ts`, `ui/*` (Button, TextField, Select, Badge).
4. **`blood-stock`** → **`blood-request`** → **`donor`** → **`donor-location`** →
   **`notification`**, mengikuti urutan pada tabel §5.
