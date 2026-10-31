# Arsitektur DarahTerpadu (Frontend)

Frontend **React 19 + TypeScript + Vite** dengan pendekatan **Clean Architecture**.
Struktur ini diturunkan dari `PRD_DarahTerpadu_MVP_Sesuai_Alur.docx`.

## 1. Aturan dependensi

```
presentation  ──►  application  ──►  domain
      │                │               ▲
      └──► infrastructure ─────────────┘
                   │
                shared (kernel, tanpa dependensi)
```

- **domain** tidak boleh mengimpor `application`, `infrastructure`, atau `presentation`.
- **application** hanya boleh mengimpor `domain` dan `shared`.
- **infrastructure** mengimplementasikan kontrak `domain/repositories` & `application/ports`.
- **presentation** memanggil use case (application), tidak memanggil `fetch` langsung.
- **shared** adalah kernel: tipe primitif, konstanta, util murni.

> Penamaan file: `kebab-case.ts`. Tipe/status memakai union literal (`as const`),
> **bukan `enum`**, karena `tsconfig` memakai `erasableSyntaxOnly`.

## 2. Struktur folder

```
src/
├─ app/                        # Composition root (bootstrap UI)
│  ├─ App.tsx                  # root component
│  ├─ App.css
│  ├─ providers/               # komposisi React Context (Auth, Notification)
│  └─ router/                  # definisi route + guard per peran
│
├─ domain/                     # Inti bisnis, tanpa dependensi framework
│  ├─ entities/
│  │  ├─ user.ts               # Pengguna
│  │  ├─ facility.ts           # Fasilitas (UTD/PMI, RS)
│  │  ├─ blood-bag.ts          # Kantong Darah (status uji EX-01)
│  │  ├─ blood-request.ts      # Request Darah + riwayat status
│  │  ├─ donor.ts              # Pendonor + Riwayat Donasi
│  │  ├─ donor-registration.ts # Pendaftaran Donor + screening + tiket QR
│  │  ├─ donor-location.ts     # Lokasi & Jadwal Donor
│  │  ├─ notification.ts
│  │  └─ audit-log.ts
│  ├─ enums/
│  │  ├─ user.ts               # UserRole, FacilityType
│  │  ├─ blood.ts              # golongan, rhesus, komponen, status kantong
│  │  ├─ blood-request.ts      # status request, urgensi
│  │  ├─ donor.ts              # status pendaftaran, hasil screening
│  │  ├─ notification.ts
│  │  └─ audit.ts
│  └─ repositories/            # Kontrak akses data (interface)
│
├─ application/                # Use case / orkestrasi bisnis
│  ├─ use-cases/
│  │  ├─ auth/
│  │  ├─ blood-stock/
│  │  ├─ blood-request/
│  │  ├─ donor/
│  │  ├─ donor-location/
│  │  └─ notification/
│  ├─ ports/                   # Kontrak layanan eksternal
│  │  ├─ clock-port.ts
│  │  ├─ crypto-port.ts
│  │  ├─ id-generator-port.ts
│  │  ├─ notification-port.ts
│  │  ├─ qr-code-port.ts
│  │  └─ token-storage-port.ts
│  └─ dto/                     # Input/Output use case
│
├─ infrastructure/             # Detail teknis
│  ├─ demo/                    # fixture data contoh (tanpa backend)
│  ├─ repositories/            # implementasi kontrak domain
│  ├─ storage/                 # token storage
│  └─ container.ts             # composition root
│
├─ presentation/               # UI
│  ├─ pages/
│  │  ├─ public/               # landing, lokasi & status stok (PD-01, PD-02, EX-05)
│  │  ├─ auth/                 # login & registrasi (PD-03, AU-01, AR-01)
│  │  ├─ donor/                # dashboard pendonor, tiket QR, riwayat (PD-04, PD-05, EX-04)
│  │  ├─ utd/                  # portal Admin UTD/PMI (AU-01..AU-06, EX-02, EX-03)
│  │  └─ hospital/             # portal Admin RS (AR-01..AR-06)
│  ├─ components/{ui,shared}/
│  ├─ layouts/
│  ├─ hooks/
│  ├─ contexts/
│  ├─ utils/
│  └─ styles/global.css
│
└─ shared/
   ├─ types/common.ts          # EntityId, IsoDateTime
   ├─ constants/{app,routes,labels}.ts
   └─ utils/format-date.ts
```

## 3. Pemetaan fitur PRD → lapisan

| Fitur | Domain | Application | Presentation |
| --- | --- | --- | --- |
| AU-02 Input kantong | `BloodBag`, `BloodBagRepository` | `use-cases/blood-stock/create-blood-bag.ts` | `pages/utd/BloodBagFormPage` |
| AU-03 Stok & kedaluwarsa | `ExpiryStatus`, `listExpiring` | `use-cases/blood-stock/get-stock.ts` | `pages/utd/StockPage` |
| AU-04..AU-06 Request masuk | `BloodRequest`, status history | `use-cases/blood-request/*` | `pages/utd/RequestsPage` |
| PD-01/PD-02 Lokasi donor | `DonorLocation`, `DonorSchedule` | `use-cases/donor-location/*` | `pages/public/*` |
| PD-03 Registrasi pendonor | `Donor` | `use-cases/auth/register-donor.ts` | `pages/auth/RegisterPage` |
| PD-04 Screening | `HealthScreening` | `use-cases/donor/submit-screening.ts` | `pages/donor/DonorFormPage` |
| PD-05 Tiket QR | `ticketCode` | `use-cases/donor/issue-ticket.ts` + `QrCodeService` | `pages/donor/TicketPage` |
| AR-02 Stok real-time | `StockLevel` | `use-cases/blood-stock/get-availability.ts` | `pages/hospital/AvailabilityPage` |
| AR-03..AR-06 Request RS | `BloodRequest` | `use-cases/blood-request/*` | `pages/hospital/*` |
| EX-01 Status uji | `BloodTestStatus` | validasi stok | badge status di UI |
| EX-02 Kelola lokasi/jadwal | `DonorLocation` | `use-cases/donor-location/manage-*.ts` | `pages/utd/LocationsPage` |
| EX-03 Scan QR & daftar hadir | `DonorRegistrationStatus` | `use-cases/donor/scan-ticket.ts` | `pages/utd/ScanPage` |
| EX-04 Interval donor | `nextEligibleAt` | `use-cases/donor/get-history.ts` | `pages/donor/HistoryPage` |
| EX-05 Status stok publik | `StockLevel` | `use-cases/blood-stock/get-public-summary.ts` | `pages/public/HomePage` |

## 4. Konvensi penting

1. **Kantong layak stok** hanya `testStatus === 'passed'` dan belum kedaluwarsa (EX-01).
2. **Reject request wajib alasan** (`rejectionReason`), transisi status mengikuti PRD §6.
3. **Data sensitif** (NIK, hasil screening) selalu lewat `CryptoService`, tidak pernah
   ditaruh di `localStorage`/URL.
4. **Waktu** diambil dari port `Clock`, bukan `new Date()` di komponen.
5. **Bahasa UI** Indonesia; format tanggal util `shared/utils/format-date.ts`.
6. **Import** selalu memakai alias `@/...` (dikonfigurasi di `tsconfig.app.json` & `vite.config.ts`).

## 5. Fitur autentikasi (sudah berjalan)

### Alur

```
UI (LoginPage / RegisterDonorPage)
  └─ useAuth() ............ presentation/hooks/use-auth.ts
       └─ AuthProvider .... app/providers/AuthProvider.tsx  (composition root)
            └─ container.authUseCases
                 ├─ LoginUseCase         → validasi → AuthRepository.login → TokenStorage.set
                 ├─ RegisterDonorUseCase → validasi → AuthRepository.registerDonor → TokenStorage.set
                 ├─ RestoreSessionUseCase→ TokenStorage.get → AuthRepository.fetchCurrentUser
                 └─ LogoutUseCase        → AuthRepository.logout → TokenStorage.set(null)
```

### Berkas kunci

| Lapisan | Berkas | Peran |
| --- | --- | --- |
| Domain | `domain/repositories/auth-repository.ts` | Kontrak login/registrasi/current user (tanpa detail HTTP) |
| Domain | `domain/errors/app-error.ts` | `AppError` + `APP_ERROR_CODES` (kode error dipakai UI) |
| Application | `use-cases/auth/auth-validation.ts` | Validasi form murni (tanpa React), sumber pesan error field |
| Application | `use-cases/auth/*.use-case.ts` | Orkestrasi, tidak tahu React/HTTP |
| Application | `dto/auth.dto.ts` | `LoginInput`, `RegisterDonorInput`, `AuthenticatedUser` |
| Application | `ports/token-storage-port.ts` | Abstraksi penyimpanan token |
| Infrastructure | `repositories/in-memory-auth-repository.ts` | Akun demo + pendaftaran pendonor, disimpan di `sessionStorage` |
| Infrastructure | `storage/session-token-storage.ts` | Token di `sessionStorage` (bukan `localStorage`) |
| Infrastructure | `container.ts` | Composition root: merakit repository & use case (mock-only) |
| Presentation | `app/router/AppRouter.tsx` | Peta rute publik + portal per peran |
| Presentation | `app/router/guards.tsx` | `RequireAuth` (redirect + `state.from`), `RequireRole` (403) |

### Akun demo

Aplikasi ini **hanya tampilan** — tidak ada backend, tidak ada variabel `.env`, dan tidak
ada klien HTTP. Autentikasi dijalankan oleh repository in-memory.

| Peran | Email | Kata sandi |
| --- | --- | --- |
| Admin UTD/PMI | `utd@darahterpadu.id` | `Password123!` |
| Admin RS | `rs@darahterpadu.id` | `Password123!` |
| Pendonor | `donor@darahterpadu.id` | `Password123!` |

Akun pendonor baru hasil registrasi disimpan di `sessionStorage` dan hilang saat tab
ditutup — sengaja dipilih agar data contoh tidak menumpuk.

### Aturan rute

| Rute | Akses |
| --- | --- |
| `/` | publik (landing, PD-01) |
| `/login`, `/register` | publik; bila sudah login diarahkan ke beranda peran |
| `/donor` | `donor` |
| `/utd` | `utd_admin` |
| `/rs` | `hospital_admin` |
| `/403`, `*` | halaman status |

Peran yang salah **tidak** diarahkan ke login, melainkan ke `/403`, agar pengguna tidak
kehilangan sesi hanya karena salah tautan.

## 6. Data contoh (mode tampilan)

Karena aplikasi belum memakai backend, isi portal berasal dari fixture di
`src/infrastructure/demo/`.

```
infrastructure/demo/
├─ demo-clock.ts ............ fromNowDays()/dateInDays() agar tanggal selalu relatif hari ini
├─ demo-blood-bags.ts ....... 15 kantong (campur tersedia, mendekati kedaluwarsa, reaktif, kedaluwarsa)
├─ demo-blood-requests.ts ... 4 permintaan RS (menunggu, disetujui, ditolak, diterima)
├─ demo-donors.ts ........... profil pendonor, 3 riwayat donasi, 1 tiket aktif
├─ demo-locations.ts ........ 2 lokasi + jadwal layanan
└─ index.ts ................. barrel
```

### Alur data

```
infrastructure/demo/*  (fixture)
  └─ DemoDataProvider ... app/providers/DemoDataProvider.tsx
       └─ useDemoData() . presentation/hooks/use-demo-data.ts
            └─ UtdDashboardPage / HospitalDashboardPage / DonorDashboardPage / LandingPage
```

Perhitungan turunan tidak disimpan di fixture, melainkan dihitung lewat aturan domain:

| Aturan | Berkas | Dipakai untuk |
| --- | --- | --- |
| `isBagUsable` | `domain/rules/stock.ts` | stok hanya dari kantong lolos uji & belum kedaluwarsa (EX-01) |
| `daysUntilExpiry` / `isNearExpiry` | `domain/rules/stock.ts` | penanda kedaluwarsa ≤ 7 hari (AU-03) |
| `getStockLevel` / `summarizeStockByBloodType` | `domain/rules/stock.ts` | status Aman/Menipis/Kritis per golongan (AR-02, EX-05) |
| `stockLevelTone` dkk. | `presentation/utils/badges.ts` | warna `StatusBadge` |

`application/use-cases/*` dan `application/ports/*` (clock, crypto, id-generator,
notification, qr-code) sengaja dibiarkan sebagai kerangka: saat backend tersedia, halaman
tinggal diarahkan ke use case tanpa mengubah lapisan domain.

## 7. Langkah berikutnya

- Implementasi modul stok darah (AU-02, AU-03, EX-01) dan permintaan (AU-04..AU-06, AR-02..AR-06).
- Tambah `domain/rules` untuk transisi status permintaan saat alur verifikasi disepakati.
- Saat backend siap: buat `infrastructure/repositories/http-*.ts` yang mengimplementasikan
  kontrak di `domain/repositories/`, lalu tukar implementasinya di `container.ts`.
  Lapisan presentation tidak perlu diubah karena hanya bergantung pada use case.

