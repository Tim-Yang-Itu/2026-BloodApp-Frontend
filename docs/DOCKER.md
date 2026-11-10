# Panduan Docker — DonorKu Frontend

Panduan build, push, dan deploy image frontend (React 19 + TypeScript + Vite, disajikan oleh nginx).

Aplikasi ini **UI-only**: tidak ada backend, tidak ada `.env`, dan tidak ada `VITE_*` yang perlu di-inject saat build. Satu image yang sama dipakai di semua environment.

---

## 1. File yang terlibat

| File | Fungsi |
| --- | --- |
| `Dockerfile` | Multi-stage build: `deps` → `build` → `runtime` (nginx alpine). |
| `.dockerignore` | Mengecualikan `node_modules`, `dist`, `.git`, `docs`, `*.md` dari build context. |
| `nginx/default.conf` | Konfigurasi nginx: SPA fallback, gzip, cache aset, header keamanan, `/healthz`. |
| `docker-bake.hcl` | Definisi build untuk `docker buildx bake` (registry, tag, platform, label OCI). |
| `docker-compose.yml` | Deploy: pull image dari Docker Hub dan jalankan di port host. |
| `update.sh` | Script update di server: pull image → recreate container → prune. |

Struktur image:

```
┌──────────────┐   ┌──────────────┐   ┌──────────────────────┐
│ node:22      │ → │ node:22      │ → │ nginx:stable-alpine  │
│ npm ci       │   │ vite build   │   │ /usr/share/nginx/html│
│ (deps)       │   │ (dist)       │   │ + default.conf       │
└──────────────┘   └──────────────┘   └──────────────────────┘
```

---

## 2. Prasyarat

- Docker Desktop / Docker Engine 24+
- Buildx (sudah bundled di Docker Desktop; di Linux: `docker buildx version`)
- Sudah login ke registry target:

```powershell
docker login
# atau untuk GHCR:
# echo $env:GITHUB_TOKEN | docker login ghcr.io -u <username> --password-stdin
```

Builder `docker-container` diperlukan untuk `--push` multi-arch dan attestation:

```powershell
docker buildx create --name donorku-builder --driver docker-container --use --bootstrap
docker buildx ls
```

---

## 3. Build & push

### 3.1 Perintah utama

```powershell
docker buildx bake --push
```

Perintah ini akan:

1. Build stage `runtime` dari `Dockerfile`.
2. Memberi tag `urfixxy/donorku-frontend:latest`.
3. Push ke Docker Hub.

### 3.2 Cek konfigurasi tanpa build

```powershell
docker buildx bake --print
```

Berguna untuk memastikan tag, platform, dan build arg sudah benar sebelum build panjang.

### 3.3 Build lokal (tanpa push)

```powershell
docker build -t urfixxy/donorku-frontend:latest .
# atau lewat compose:
docker compose up -d --build
```

---

## 4. Variabel pada `docker-bake.hcl`

Semua variabel bisa dioverride dari environment shell (PowerShell), tanpa mengedit file.

| Variable | Default | Keterangan |
| --- | --- | --- |
| `REGISTRY` | `urfixxy/donorku-frontend` | Nama repository image (tanpa tag). |
| `TAG` | `latest` | Tag image. |
| `NODE_VERSION` | `22-alpine` | Base image Node untuk stage build. |
| `NGINX_VERSION` | `stable-alpine` | Base image runtime. |
| `PLATFORMS` | `linux/amd64` | Target platform; tambahkan `linux/arm64` bila server ARM. |

Contoh override:

```powershell
$env:TAG = "v1.0.0"
$env:PLATFORMS = "linux/amd64,linux/arm64"
docker buildx bake --push
```

> Catatan: build `linux/arm64` di mesin x86 memakai emulasi QEMU sehingga jauh lebih lambat.
> Set platform hanya sesuai kebutuhan server.

---

## 5. Deploy di server

Server hanya perlu **pull**, karena image sudah di-build dan di-push dari lokal/CI.

```powershell
# 1. taruh docker-compose.yml di server, lalu:
docker compose pull
docker compose up -d

# 2. cek status & log
docker compose ps
docker compose logs -f frontend
```

Akses aplikasi di `http://<ip-server>:2000`.

### 5.1 Variabel compose

| Variable | Default | Keterangan |
| --- | --- | --- |
| `APP_PORT` | `2000` | Port host yang dipetakan ke port 80 container. |
| `TAG` | `latest` | Tag image yang dipull. |
| `TZ` | `Asia/Jakarta` | Timezone container. |

Contoh mengganti port:

```powershell
$env:APP_PORT = "8080"
docker compose up -d
```

### 5.2 Update aplikasi

Cara cepat, cukup jalankan script:

```bash
./update.sh
```

Isi script ini: `pull` image terbaru → recreate container → `docker image prune -f` → tampilkan status.
Script ini **tidak build** — image di-build & di-push dari lokal (`docker buildx bake --push`).

Atau manual:

```powershell
docker compose pull
docker compose up -d
docker image prune -f
```

`pull_policy: always` memastikan `docker compose up -d` selalu memakai image terbaru dari registry.

---

## 6. Kesehatan container

Image menyediakan endpoint ringan untuk health check:

```powershell
curl http://localhost:2000/healthz   # -> ok
```

`HEALTHCHECK` di `Dockerfile` dan `docker-compose.yml` memanggil endpoint yang sama,
sehingga `docker ps` menampilkan status `healthy` / `unhealthy`.

```powershell
docker inspect --format '{{.State.Health.Status}}' donorku-frontend
```

---

## 7. Konfigurasi nginx (`nginx/default.conf`)

| Bagian | Perilaku |
| --- | --- |
| SPA fallback | `try_files $uri $uri/ /index.html` — refresh di `/dashboard-rs/stok` tidak 404. |
| `/assets/` | `Cache-Control: public, max-age=31536000, immutable` (nama file ber-hash dari Vite). |
| `/index.html` | `no-cache, must-revalidate` agar deploy baru langsung terpakai. |
| `/healthz` | `200 ok` tanpa akses log. |
| gzip | Aktif untuk HTML, CSS, JS, JSON, SVG, WOFF2. |
| Header keamanan | `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`. |
| `server_tokens off` | Versi nginx tidak dibocorkan. |

---

## 8. Menjalankan mode development

Image di atas adalah build produksi (statis). Untuk HMR saat ngoding, gunakan dev server Vite biasa:

```powershell
npm ci
npm run dev
```

Atau di container sementara (tanpa mengubah image produksi):

```powershell
docker run --rm -it -p 5173:5173 -v "${PWD}:/app" -v /app/node_modules -w /app node:22-alpine `
  sh -c "npm ci && npm run dev -- --host 0.0.0.0 --port 5173"
```

---

## 9. Troubleshooting

| Gejala | Penyebab | Solusi |
| --- | --- | --- |
| `docker buildx bake --push` → `no builder instance` / `attestation not supported` | Builder default pakai driver `docker`. | Buat builder `docker-container` (lihat §2). |
| `ERROR: failed to solve: ... variable cycle` | `locals` di HCL saling mereferensikan. | HCL buildx tidak boleh ada siklus; pakai variable langsung. |
| Build ulang selalu full (tidak pakai cache) | `package-lock.json` berubah atau `.dockerignore` salah. | Pastikan `node_modules` & `dist` ter-ignore, commit lockfile. |
| Halaman blank / 404 saat refresh | Fallback SPA tidak aktif. | Pastikan `nginx/default.conf` ter-copy ke `/etc/nginx/conf.d/`. |
| Perubahan kode tidak muncul di server | Image `:latest` lama masih terpakai. | `docker compose pull; docker compose up -d`. |
| Perubahan aset tidak terlihat di browser | `index.html` ter-cache. | Hard refresh (`Ctrl+Shift+R`); pastikan header `no-cache` aktif. |
| Port 2000 sudah dipakai | Konflik dengan service lain. | `$env:APP_PORT="8080"; docker compose up -d`. |
| Build error `tsc -b` | Type error TypeScript. | Jalankan `npm run build` lokal dulu. |

---

## 10. Ringkasan perintah

```powershell
# Build & push image
docker buildx bake --push

# Cek konfigurasi
docker buildx bake --print

# Deploy di server
docker compose pull
docker compose up -d

# Update (cara cepat)
./update.sh

# Lihat status & log
docker compose ps
docker compose logs -f frontend

# Hentikan
docker compose down
```
