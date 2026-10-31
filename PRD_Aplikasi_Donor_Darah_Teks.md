# PRODUCT REQUIREMENTS DOCUMENT

## Aplikasi Donor Darah

PRD yang (semoga) tidak bikin ngantuk

Disusun oleh: Tim \[isi nama tim\]

Untuk: Lomba \[isi nama lomba\]

Status: Draft v1

Catatan: Nama aplikasi belum ditentukan, jadi sementara pakai "Aplikasi
Donor Darah". Ganti kapan saja ya! Dokumen ini disusun dari alur kasar
(flowchart) buatan teman satu tim.

# 1. Cerita Singkat (Latar Belakang)

Bayangkan: seorang pasien butuh darah golongan B+ sekarang juga.
Keluarganya panik, rumah sakit telepon sana-sini, sementara di PMI ada
stok yang nganggur dan hampir expired.

Di sisi lain, ada banyak orang baik yang sebenarnya mau donor, tapi
bingung: "Donor di mana ya? Syaratnya apa? Antre nggak?"

Masalahnya sederhana: informasi stok, permintaan, dan pendonor belum
terhubung dalam satu tempat. Aplikasi ini hadir sebagai jembatannya.

Intinya: satu kantong darah bisa jadi satu harapan baru!

# 2. Tujuan Produk

1.  Tujuan: Stok darah UTD/PMI tercatat rapi dan terpantau. Kenapa
    penting: Biar tidak ada kantong darah yang expired diam-diam.

2.  Tujuan: Rumah sakit bisa cek stok dan minta darah secara digital.
    Kenapa penting: Tidak perlu telepon satu per satu.

3.  Tujuan: Masyarakat mudah menemukan lokasi donor dan mendaftar.
    Kenapa penting: Makin mudah, makin banyak yang mau donor.

# 3. Siapa Saja Pemainnya? (Peran Pengguna)

-   Admin UTD / PMI --- Julukan: Sang Penjaga Stok. Tugas utama: Input
    kantong darah, pantau stok dan expired, proses permintaan dari RS.

-   Pendonor / Publik --- Julukan: Pahlawan Tanpa Jubah. Tugas utama:
    Cari lokasi donor, daftar, isi screening, dapat tiket QR.

-   Admin RS --- Julukan: Sang Pencari Darah. Tugas utama: Cek
    ketersediaan real time, buat request, konfirmasi penerimaan.

# 4. Alur Pengguna (User Flow)

Alur di bawah ini mengikuti diagram kasar dari teman satu tim. Ikuti
panahnya dari atas ke bawah.

## 4.1 Admin UTD / PMI · Jalur A: "Isi Lemari Darah"

1.  1.  Login ke dashboard UTD/PMI.
2.  2.  Pilih Input Kantong Darah Baru.
3.  3.  Isi form (golongan darah, rhesus, tanggal expired, dan data
        lainnya).
4.  4.  Data masuk database.
5.  5.  Sistem cek stok & kirim notifikasi expired.

## 4.1 Admin UTD / PMI · Jalur B: "Layani Permintaan RS"

1.  1.  Login ke dashboard UTD/PMI.
2.  2.  Terima request darah dari RS.
3.  3.  Verifikasi & cek stok.
4.  4.  Keputusan: Stok cukup? Jika TIDAK, tolak request. Jika YA,
        setujui request.
5.  5.  Update status request (terlihat oleh RS).

## 4.2 Pendonor / Publik

1.  1.  Buka landing page (tanpa login, jadi tidak ribet).
2.  2.  Eksplorasi tempat/lokasi donor darah.
3.  3.  Lihat detail donor darah.
4.  4.  Keputusan: Ingin donor? Jika TIDAK, kembali eksplorasi
        (lihat-lihat dulu, tidak dipaksa). Jika YA, lanjut daftar
        sebagai pendonor.
5.  5.  Registrasi & login sebagai pendonor.
6.  6.  Isi form donor & screening kesehatan.
7.  7.  Dapat tiket digital dengan QR Code.
8.  8.  Selesai.

## 4.3 Admin RS

1.  1.  Login ke dashboard RS.
2.  2.  Cek ketersediaan darah secara real time.
3.  3.  Buat request ke UTD/PMI (form request darah).
4.  4.  Menunggu approval (status berubah sesuai keputusan UTD/PMI).
5.  5.  Keputusan: Approved? Jika TIDAK, sistem kirim push notif gagal.
        Jika YA, request disetujui, tunggu darah datang.
6.  6.  Konfirmasi penerimaan saat darah sudah diterima.

# 5. Kebutuhan Fitur (Functional Requirements)

Prioritas: Wajib = MVP, harus ada · Sebaiknya = bagus kalau ada · Bonus
= kalau sempat

## Modul Admin UTD / PMI

UTD-01 \| Login dashboard \| Admin UTD/PMI masuk dengan akun terdaftar
\| Prioritas: Wajib

UTD-02 \| Input kantong darah \| Form berisi golongan darah, rhesus,
tanggal expired, dan data pendukung lainnya \| Prioritas: Wajib

UTD-03 \| Penyimpanan database \| Setiap kantong darah tersimpan dan
bisa dilihat kembali \| Prioritas: Wajib

UTD-04 \| Monitoring stok \| Ringkasan stok per golongan darah dan
rhesus \| Prioritas: Wajib

UTD-05 \| Notifikasi expired \| Peringatan otomatis untuk kantong darah
yang mendekati atau melewati tanggal expired \| Prioritas: Wajib

UTD-06 \| Terima request RS \| Daftar permintaan masuk dari rumah sakit
\| Prioritas: Wajib

UTD-07 \| Verifikasi & cek stok \| Admin mencocokkan permintaan dengan
stok yang tersedia \| Prioritas: Wajib

UTD-08 \| Setujui / tolak request \| Admin memutuskan; jika disetujui
status diperbarui \| Prioritas: Wajib

UTD-09 \| Update status request \| Status berubah dan terlihat oleh RS
pemohon \| Prioritas: Wajib

## Modul Pendonor / Publik

PDN-01 \| Landing page tanpa login \| Siapa pun bisa melihat informasi
tanpa daftar dulu \| Prioritas: Wajib

PDN-02 \| Eksplorasi lokasi donor \| Daftar/peta tempat donor darah \|
Prioritas: Wajib

PDN-03 \| Detail donor darah \| Informasi lengkap lokasi atau kegiatan
donor \| Prioritas: Wajib

PDN-04 \| Registrasi & login \| Akun baru diminta saat pengguna
memutuskan ingin donor \| Prioritas: Wajib

PDN-05 \| Form donor & screening \| Pendonor mengisi data diri dan
pertanyaan kesehatan \| Prioritas: Wajib

PDN-06 \| Tiket digital QR Code \| Bukti pendaftaran yang ditunjukkan di
lokasi donor \| Prioritas: Wajib

## Modul Admin RS

RS-01 \| Login dashboard \| Admin RS masuk dengan akun terdaftar \|
Prioritas: Wajib

RS-02 \| Cek ketersediaan real time \| Lihat stok darah UTD/PMI yang
selalu terbaru \| Prioritas: Wajib

RS-03 \| Form request darah \| Buat permintaan darah ke UTD/PMI \|
Prioritas: Wajib

RS-04 \| Pelacakan status \| Pantau status request (menunggu, disetujui,
ditolak) \| Prioritas: Wajib

RS-05 \| Push notifikasi gagal \| RS diberi tahu bila request ditolak \|
Prioritas: Wajib

RS-06 \| Konfirmasi penerimaan \| RS menandai darah sudah diterima \|
Prioritas: Wajib

## Usulan Tambahan (belum ada di alur) \[USULAN\]

-   EXT-01 \| Notifikasi ke RS saat request disetujui, bukan hanya saat
    gagal \| Prioritas: Sebaiknya

-   EXT-02 \| Riwayat donor pada akun pendonor \| Prioritas: Bonus

-   EXT-03 \| Filter lokasi donor berdasarkan jarak atau tanggal \|
    Prioritas: Sebaiknya

-   EXT-04 \| Pengingat jadwal donor lewat notifikasi \| Prioritas:
    Bonus

Tenang, fitur Wajib dulu ya. Yang Bonus dikerjain kalau waktu masih ada!

# 6. Status Permintaan Darah

Supaya semua pihak sepemahaman, status request dibuat sederhana:

-   Menunggu --- Request baru dikirim RS. Diubah oleh: Sistem
    (otomatis).

-   Disetujui --- Stok cukup, request diterima. Diubah oleh: Admin
    UTD/PMI.

-   Ditolak --- Stok tidak cukup. Diubah oleh: Admin UTD/PMI.

-   Diterima --- Darah sudah sampai di RS. Diubah oleh: Admin RS.

# 7. Kebutuhan Non-Fungsional

\[USULAN\] Usulan, silakan disesuaikan dengan kemampuan tim.

-   Keamanan: hanya admin terdaftar yang bisa mengakses dashboard; data
    kesehatan pendonor dijaga ketat.

-   Real time: perubahan stok langsung terlihat oleh RS tanpa perlu
    refresh berulang.

-   Responsif: nyaman dibuka dari HP, karena pendonor pasti lebih sering
    pakai HP.

-   Mudah dipakai: pendonor baru bisa sampai ke tiket QR dalam beberapa
    langkah saja.

# 8. Ukuran Keberhasilan

\[USULAN\]

-   Kantong darah expired yang terbuang --- Berkurang karena ada
    notifikasi expired.

-   Waktu dari request RS sampai keputusan UTD/PMI --- Lebih cepat
    dibanding telepon manual.

-   Pendonor yang menyelesaikan pendaftaran sampai tiket QR --- Terus
    bertambah dari waktu ke waktu.

# 9. Ruang Lingkup

MASUK (versi lomba):

-   Tiga peran: Admin UTD/PMI, Pendonor, Admin RS

-   Seluruh alur pada diagram di atas

BELUM MASUK (dulu):

-   Pembayaran atau biaya darah

-   Pengiriman/logistik darah ke RS

-   Integrasi dengan sistem nasional

# 10. Pertanyaan Terbuka (PR Tim!)

Beberapa hal belum terlihat jelas di alur, jadi perlu diputuskan bareng:

1.  Tiket QR di-scan oleh siapa? Apakah petugas UTD/PMI di lokasi donor?
    Kalau iya, perlu fitur scan di sisi admin.

2.  Bagaimana kalau screening kesehatan tidak lolos? Apakah pendonor
    langsung diberi tahu dan tiket tidak diterbitkan?

3.  Kapan stok berkurang? Saat request disetujui, atau saat RS
    konfirmasi penerimaan?

4.  Apakah RS juga dapat notifikasi saat request disetujui? Di alur
    hanya ada notif gagal.

5.  Data lokasi donor diinput siapa? Apakah admin UTD/PMI, dan perlu
    menu khusus untuk itu?

6.  Nama aplikasi apa? Biar dokumen ini bisa punya judul yang keren.

PR tim: diskusiin ini bareng ya. Jangan sampai ada yang lupa!

# Penutup

Kalau alur ini berjalan, satu kantong darah bisa jadi satu nyawa
terselamatkan. Yuk, kita buat aplikasinya, dan semoga menang lomba!

Dokumen ini hidup: boleh diedit, dicoret, dan ditambah sesuai hasil
diskusi tim.
