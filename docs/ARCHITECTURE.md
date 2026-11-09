# Arsitektur DarahTerpadu (Frontend)

Frontend **React 19 + TypeScript + Vite** dengan pendekatan **Feature-based Clean Architecture**:
kode dipecah per **fitur bisnis** (vertical slice), dan setiap fitur memiliki **empat lapisan**
clean architecture di dalamnya. Struktur ini diturunkan dari `PRD_Aplikasi_Donor_Darah_Teks.md`
(modul **UTD**, **PDN**, **RS**, **EXT**); pemetaan lengkap ada di §5.

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
  (`features/blood-stock/infrastructure/...` ❌).
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
│  ├─ App.tsx                  # shell tipis: AppProviders + AppRoutes
│  ├─ container.ts             # merakit container seluruh fitur
│  ├─ layouts/                 # kerangka halaman lintas fitur (DonorLayout, UtdLayout, HospitalLayout)
│  ├─ pages/                   # halaman gabungan >1 fitur, dikelompokkan per peran
│  │  ├─ public/               # PublicLayout + halaman 404
│  │  ├─ donor/                # route penghubung lintas fitur (detail jadwal)
│  │  ├─ utd/                  # dashboard Admin UTD/PMI
│  │  └─ hospital/             # dashboard Admin RS (types, navigation, view-model, components,
│  │                           #   HospitalOverviewPage, HospitalStockPage, HospitalRequestsPage)
│  ├─ providers/               # AppProviders: BrowserRouter + AuthProvider
│  └─ router/                  # AppRoutes.tsx: peta rute + guard per peran
│
├─ features/                   # satu folder = satu fitur bisnis (lihat §5)
│  ├─ auth/                    # UTD-01, RS-01, PDN-04
│  ├─ blood-stock/             # UTD-02, UTD-03, UTD-04, RS-02
│  ├─ blood-request/           # UTD-06..UTD-09, RS-03, RS-04, RS-06
│  ├─ donor-location/          # PDN-02, PDN-03, EXT-03
│  ├─ donor-registration/      # PDN-05, PDN-06
│  ├─ landing-page/            # PDN-01
│  ├─ donor-history/           # EXT-02
│  ├─ notification/            # UTD-05, RS-05, EXT-01, EXT-04
│  │
│  └─ <tiap fitur>/
│     ├─ index.ts              # public API fitur — satu-satunya pintu masuk
│     ├─ domain/
│     ├─ application/
│     ├─ infrastructure/
│     └─ presentation/
│
└─ shared/                     # kernel, tanpa dependensi ke features/app
   ├─ domain/                  # value object lintas fitur (BloodType, UserRole, FacilityType)
   ├─ types/                   # tipe primitif (EntityId, IsoDateTime, Result)
   ├─ constants/               # konstanta aplikasi, daftar rute, label
   ├─ utils/                   # util murni (format tanggal, dsb.)
   ├─ ui/                      # design system: Button, TextField, Select, Badge
   └─ styles/global.css        # @config + base layer + utilitas dekoratif
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

## 5. Pemetaan modul PRD → feature slice

Setiap modul PRD dipetakan ke **tepat satu** feature slice (kecuali halaman gabungan).
Kolom *Rute* adalah tempat UI-nya dirender.

### 5.1 Ringkasan pembagian

| Feature slice | Modul PRD | Peran pemakai |
| --- | --- | --- |
| `auth` | UTD-01, RS-01, PDN-04 | semua |
| `blood-stock` | UTD-02, UTD-03, UTD-04, RS-02 | Admin UTD, Admin RS |
| `blood-request` | UTD-06, UTD-07, UTD-08, UTD-09, RS-03, RS-04, RS-06 | Admin UTD, Admin RS |
| `donor-location` | PDN-02, PDN-03, EXT-03 | publik, Admin UTD |
| `donor-registration` | PDN-05, PDN-06 | pendonor, Admin UTD (scan) |
| `donor-history` | EXT-02 | pendonor |
| `notification` | UTD-05, RS-05, EXT-01, EXT-04 | semua |
| `landing-page` | PDN-01 | publik |

Halaman yang menggabungkan lebih dari satu fitur tidak dibuatkan feature slice baru; ia
tinggal di `src/app/pages/<peran>/` dan hanya memakai API publik `features/<x>/index.ts`:

| Halaman | Modul PRD | Fitur yang dipakai | Rute |
| --- | --- | --- | --- |
| `app/pages/utd` | UTD-04, UTD-06 | `blood-stock`, `blood-request` | `/utd`, `/utd/permintaan` |
| `app/pages/hospital` | RS-02, RS-04, RS-06 | `blood-stock`, `blood-request` | `/dashboard-rs`, `/dashboard-rs/stok`, `/dashboard-rs/permintaan` |
| `app/pages/donor` | PDN-03 | `donor-location` + `donor-registration` | `/jadwal-donor/:locationId` |
| `app/pages/public` | – | shell publik + halaman 404 | `*` |

Setiap tab pada dashboard RS adalah rute nyata (`HospitalLayout` di `src/app/layouts/` sebagai
layout route): `overview` = RS-02 ringkasan (`/dashboard-rs`, index), `stock` = RS-02 detail
ketersediaan (`/dashboard-rs/stok`), `requests` = RS-04/RS-06 (`/dashboard-rs/permintaan`).
Daftar menu beserta ikonnya ada di `app/pages/hospital/navigation.ts` (`HOSPITAL_NAV_ITEMS`),
sehingga sidebar memakai `NavLink` dan posisi halaman bertahan setelah refresh.

### 5.2 Detail per modul

| ID | Modul PRD | Feature slice | Use case | Rute / Presentation |
| --- | --- | --- | --- | --- |
| UTD-01 | Login dashboard UTD/PMI | `auth` | `login.use-case` | `/login` |
| UTD-02 | Input kantong darah | `blood-stock` | `create-blood-bag.use-case` | `/utd/kantong/baru` |
| UTD-03 | Penyimpanan database (kantong tersimpan) | `blood-stock` | `create-blood-bag.use-case`, `list-stock.use-case` | `/utd/stok` |
| UTD-04 | Monitoring stok per golongan & rhesus | `blood-stock` | `get-stock-summary.use-case` | `/utd` (ringkasan) |
| UTD-05 | Notifikasi expired | `notification` | `notify-expiring-bags.use-case` | `/utd/kadaluwarsa` + `NotificationBell` |
| UTD-06 | Terima request RS | `blood-request` | `list-requests.use-case` | `/utd/permintaan` |
| UTD-07 | Verifikasi & cek stok | `blood-request` | `verify-request.use-case` | `/utd/permintaan/:id` |
| UTD-08 | Setujui / tolak request | `blood-request` | `approve-request.use-case`, `reject-request.use-case` | `/utd/permintaan/:id` |
| UTD-09 | Update status request | `blood-request` | `update-request-status.use-case` | otomatis setelah UTD-08 |
| PDN-01 | Landing page tanpa login | `landing-page` | komposisi `blood-stock` + `donor-location` | `/` |
| PDN-02 | Eksplorasi lokasi donor | `donor-location` | `list-locations.use-case` | `/lokasi` |
| PDN-03 | Detail donor darah | `donor-location` | `get-location-detail.use-case` | `/lokasi/:id` |
| PDN-04 | Registrasi & login pendonor | `auth` | `register-donor.use-case`, `login.use-case` | `/register`, `/login` |
| PDN-05 | Form donor & screening | `donor-registration` | `submit-screening.use-case` | `/donor/daftar` |
| PDN-06 | Tiket digital QR Code | `donor-registration` | `issue-ticket.use-case`, `scan-ticket.use-case` | `/donor/tiket`, `/utd/scan` |
| RS-01 | Login dashboard RS | `auth` | `login.use-case` | `/login` |
| RS-02 | Cek ketersediaan real time | `blood-stock` | `get-availability.use-case` | `/dashboard-rs`, `/dashboard-rs/stok` |
| RS-03 | Form request darah | `blood-request` | `create-request.use-case` | `/rs/permintaan/baru` |
| RS-04 | Pelacakan status | `blood-request` | `list-requests.use-case`, `get-request.use-case` | `/dashboard-rs/permintaan` |
| RS-05 | Push notifikasi gagal | `notification` | `notify-request-rejected.use-case` | `NotificationBell` |
| RS-06 | Konfirmasi penerimaan | `blood-request` | `confirm-receipt.use-case` | `/dashboard-rs/permintaan` |
| EXT-01 | Notif ke RS saat disetujui | `notification` | `notify-request-approved.use-case` | `NotificationBell` |
| EXT-02 | Riwayat donor | `donor-history` | `get-donation-history.use-case` | `/donor/riwayat` |
| EXT-03 | Filter lokasi (jarak/tanggal) | `donor-location` | `list-locations.use-case` (filter param) | `/lokasi?jarak=&tanggal=` |
| EXT-04 | Pengingat jadwal donor | `notification` (pakai data `donor-history`) | `notify-donor-schedule.use-case` | `/donor` |

### 5.3 Entity yang dibagi antar fitur

Entity yang dipakai lebih dari satu fitur diletakkan di `shared/domain/` agar tidak ada
ketergantungan antar fitur:

| Berkas | Dipakai oleh | Alasan |
| --- | --- | --- |
| `shared/domain/blood-type.ts` | `blood-stock`, `blood-request`, `donor-registration` | `BloodType`, `Rhesus`, `BloodComponent` murni nilai, tanpa perilaku kaya |
| `shared/domain/user-role.ts` | `auth`, `app/router` | `UserRole` dipakai guard rute |
| `shared/domain/facility.ts` | `blood-request`, `donor-location` | `FacilityType` (UTD/PMI vs RS) |

Sebaliknya, entity yang punya aturan bisnis spesifik **tetap di dalam fiturnya**:

| Entity | Fitur | Alasan |
| --- | --- | --- |
| `BloodBag` + `rules/stock.ts` | `blood-stock` | aturan kelayakan stok (status uji + expired) milik fitur ini |
| `BloodRequest` + transisi status | `blood-request` | state machine PRD §6 hanya dipakai fitur ini |
| `DonorRegistration` + `HealthScreening` | `donor-registration` | aturan screening & tiket QR |
| `DonorLocation` + `DonorSchedule` | `donor-location` | aturan jadwal layanan |
| `AppNotification` | `notification` | kanal & status baca |

### 5.4 Status permintaan darah (PRD §6)

State machine hidup di `features/blood-request/domain/rules/request-status.ts`:

```
        ┌──────────┐  setujui   ┌────────────┐  konfirmasi RS  ┌───────────┐
  RS ──►│ Menunggu │───────────►│ Disetujui  │────────────────►│ Diterima  │
        └────┬─────┘            └────────────┘                 └───────────┘
             │ tolak (wajib alasan)
             ▼
        ┌─────────┐
        │ Ditolak │
        └─────────┘
```

- `menunggu` → dibuat sistem saat RS mengirim request (RS-03).
- `disetujui` / `ditolak` → hanya Admin UTD/PMI (UTD-08); tolak wajib `rejectionReason`.
- `diterima` → hanya Admin RS (RS-06).
- Transisi lain ditolak oleh aturan domain, bukan oleh UI.
- **Stok berkurang saat `diterima`**, bukan saat `disetujui` (lihat §9 no. 3).

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
- `src/app/router/AppRoutes.tsx` memetakan rute ke halaman yang diekspor `features/<x>/index.ts`
  memakai konstanta `ROUTES` dari `src/shared/constants/routes.ts` (jangan menulis path literal);
  guard per peran ada di `features/auth/presentation/components/RequireAuth.tsx`
  (`RequireAuth` / `RequireRole`).
- `src/app/providers/AppProviders.tsx` merangkai `BrowserRouter` + `AuthProvider`; provider fitur
  lain dipasang pada grup rute yang membutuhkannya di `AppRoutes.tsx` (mis. `blood-stock` dan
  `blood-request` dipasang untuk grup UTD **dan** grup `/dashboard-rs`).
- Ketiga area peran memakai **layout route** (`src/app/layouts/UtdLayout.tsx`, `DonorLayout.tsx`,
  `HospitalLayout.tsx`): sidebar/header dipasang sekali di layout, isi halaman lewat `<Outlet />`,
  dan setiap menu adalah rute nyata sehingga posisi bertahan setelah refresh.

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
   Kontrak: `features/<fitur>/application/ports/clock-port.ts` (`nowIso()`, `today()`);
   implementasi: `features/<fitur>/infrastructure/clock/system-clock.ts`. Nilai `today`
   dibagikan ke UI lewat container fitur, bukan dihitung saat render (`max` tanggal lahir, dll.).
6. **Data sensitif** (NIK, hasil screening) hanya lewat `CryptoPort`, tidak pernah di `localStorage`
   atau URL.
7. **Styling**: Tailwind CSS v4 + `tailwind.config.js` di root. Semua token (warna, font,
   bayangan) didefinisikan di config tersebut dan dimuat lewat `@config` di
   `shared/styles/global.css`; komponen **wajib** memakai kelas token, bukan nilai warna mentah
   (`#hex`, `rgb()`, `hsl()`).
8. **Bahasa UI** Indonesia; format tanggal lewat `shared/utils/format-date.ts`.
9. **Aturan bisnis** ditulis sebagai fungsi murni di `domain/rules/` agar bisa diuji tanpa React.

### 7.1 Token warna (`theme.extend.colors` di `tailwind.config.js`)

| Kelompok       | Token                                                              | Kegunaan                            |
| -------------- | ------------------------------------------------------------------ | ----------------------------------- |
| Brand          | `primary-50` … `primary-900`, `primary`, `primary-hover`, `primary-active`, `primary-soft`, `on-primary` | aksi utama, tautan, panel autentikasi |
| Teks           | `heading`, `foreground`, `label`, `muted`, `placeholder`           | hierarki tipografi                  |
| Latar          | `background`, `surface`, `surface-muted`, `surface-sunken`, `surface-highlight` | halaman, kartu, area tertekan       |
| Garis          | `border`, `border-strong`                                          | pembatas, outline kontrol           |
| Status         | `success`, `warning`, `danger`                                     | umpan balik & validasi              |
| Bayangan       | `shadow-panel`, `shadow-field`, `shadow-hero`, `shadow-heart`      | elevasi permukaan & dekorasi hero   |

Kelas jadi: `bg-surface`, `text-muted`, `border-border`, `text-on-primary`, dst.
Untuk gradien dekoratif gunakan utilitas `@utility` di `global.css` (`panel-glow`, `hero-orb`)
agar tidak ada nilai warna di JSX; nilai token di dalamnya dibaca via fungsi `theme(--color-…)`
sehingga tetap satu sumber di `tailwind.config.js`.

### 7.2 Token tipografi (`theme.extend.fontFamily`)

| Token          | Kelas          | Font     | Dipakai untuk                                   |
| -------------- | -------------- | -------- | ----------------------------------------------- |
| `sans`  | `font-sans`    | Fustat   | teks dasar aplikasi (body, form, paragraf, tombol) |
| `display` | `font-display` | Fraunces | heading `h1`–`h6`, headline, angka besar       |

Aturan `h1`–`h6 { @apply font-display }` ada di `@layer base`, jadi menulis `<h2>` otomatis
memakai Fraunces tanpa kelas tambahan. Font dimuat dari Google Fonts lewat `@import` di baris
pertama `global.css` (dengan `preconnect` di `index.html`).

Karena Fraunces adalah serif, **hindari `tracking-[-0.04em]` atau lebih rapat** pada headline besar
(spasi antar kata bisa tampak hilang); gunakan rentang `-0.01em` s/d `-0.025em`.

## 8. Keputusan atas pertanyaan terbuka PRD (§10)

Keputusan ini dipakai sebagai asumsi implementasi; ubah bila tim memutuskan lain.

| No | Pertanyaan PRD | Keputusan | Dampak ke struktur |
| --- | --- | --- | --- |
| 1 | Tiket QR di-scan siapa? | Petugas **Admin UTD/PMI** di lokasi donor, lewat halaman `/utd/scan` | use case `scan-ticket` di `donor-registration`, halaman di `app/pages/utd/` |
| 2 | Screening tidak lolos? | Tiket **tidak diterbitkan**; pendonor melihat alasan + opsi jadwal ulang | aturan `canIssueTicket` di `donor-registration/domain/rules/` |
| 3 | Kapan stok berkurang? | Saat RS **konfirmasi penerimaan** (`diterima`). Status `disetujui` hanya **mereservasi** stok | `blood-request` memanggil `blood-stock` lewat use case, bukan langsung ke repository |
| 4 | RS dapat notif saat disetujui? | **Ya** (EXT-01) | `notification/notify-request-approved.use-case` |
| 5 | Siapa yang menginput lokasi donor? | **Admin UTD/PMI**, lewat menu `/utd/lokasi` | use case `create-location`/`update-location` di `donor-location` |
| 6 | Nama aplikasi? | **DarahTerpadu** (sudah dipakai di seluruh dokumen & UI) | — |

Catatan untuk no. 3: agar `blood-request` tidak mengimpor lapisan `blood-stock`, kebutuhan
"kurangi stok" dideklarasikan sebagai **port** di
`features/blood-request/application/ports/stock-writer-port.ts`, lalu diimplementasikan di
`src/app/container.ts` dengan memakai use case `blood-stock`. Ini menjaga aturan "antar fitur
hanya lewat public API".

## 9. Status & langkah berikutnya

Sudah ada:

- `src/main.tsx` — bootstrap React + impor `@/shared/styles/global.css`.
- `src/app/App.tsx` — hanya `AppProviders` + `AppRoutes` (17 baris).
- `src/app/providers/AppProviders.tsx` — `BrowserRouter` + `AuthProvider`.
- `src/app/router/AppRoutes.tsx` — seluruh tabel rute (publik, auth, pendonor, UTD, RS) memakai `ROUTES`.
- `src/app/container.ts` — container `auth`, `bloodStock`, `bloodRequest`, `donorLocation`, `donorRegistration`.
- `src/shared/` — `styles/global.css`, `constants/routes.ts`, `domain/blood.ts`, `types/status-tone.ts`,
  `utils/{date,format-date}.ts`, `ui/*` (Button, TextField, PasswordField, SelectField, StatusBadge, PublicNavbar).
- Feature slice terimplementasi: `auth`, `landing-page`, `donor-location`, `donor-registration`,
  `blood-stock`, `blood-request` — masing-masing dengan `index.ts` sebagai satu-satunya pintu masuk.
- Halaman gabungan: `app/pages/utd` (UTD-04/06), `app/pages/hospital` (RS-02/04/06), `app/pages/donor`, `app/pages/public`.

Langkah berikutnya yang disarankan (mengikuti prioritas **Wajib** PRD):

1. **`shared`** — selesai (`domain`, `types`, `constants/routes.ts`, `utils`, `ui`).
2. **`auth`** — selesai (`LoginPage`, `RegisterPage`, `RequireAuth`/`RequireRole`, sesi `localStorage`).
3. **`app`** — selesai (`container.ts`, `router/AppRoutes.tsx`, `providers/AppProviders.tsx`, `layouts/*`).
4. **`blood-stock`** — sebagian: UTD-02/03/04, RS-02 (input kantong + monitoring + ketersediaan).
5. **`blood-request`** — sebagian: UTD-06/07/08, RS-04/RS-06; RS-03 (form request baru) belum ada.
6. **`donor-location`** — sebagian: PDN-02, PDN-03 (EXT-03 filter belum lengkap) + menu kelola lokasi UTD.
7. **`donor-registration`** — sebagian: PDN-05 (form + screening) dan PDN-06 tiket digital; scan tiket di sisi UTD belum.
8. **`notification`** — belum diimplementasikan (UTD-05, RS-05, EXT-01, EXT-04).
9. **`donor-history`** — belum diimplementasikan (EXT-02, bonus terakhir).
