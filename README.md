# Website Profil & Sistem Informasi Desa Plantungan 🌾

Sistem informasi dan profil digital resmi Pemerintah Desa Plantungan dengan arsitektur **Headless CMS Monorepo** yang memisahkan backend (Strapi Headless CMS) dan frontend (Angular 18/19 Standalone + Tailwind CSS + Chart.js + Leaflet).

---

## 📁 Struktur Monorepo

```
desa-plantungan/
├── backend/                       # Strapi Headless CMS (v4/v5)
│   ├── config/                    # Konfigurasi Database (SQLite), Server, Middleware CORS
│   └── src/
│       ├── api/                   # API Collection & Single Types
│       │   ├── profil-desa/       # SingleType: Identitas, Visi Misi, Sejarah, Kontak
│       │   ├── perangkat-desa/    # CollectionType: Struktur Aparatur & Foto
│       │   ├── data-kependudukan/ # SingleType: Statistik Jiwa, Kelompok Usia, Pendidikan
│       │   ├── potensi-desa/      # CollectionType: Minyak Rakyat, Pertanian, BUMDes
│       │   ├── program-kkn/       # CollectionType: Program Kerja & Dokumentasi KKN 2025
│       │   ├── berita/            # CollectionType: Publikasi & Warta Desa
│       │   └── apbdes/            # CollectionType: Transparansi Anggaran & LPJ
│       └── index.js               # Auto-bootstrap public API permissions
├── frontend/                      # Angular Standalone Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/              # StrapiService (HTTP Client & Smart Fallback Mock Data)
│   │   │   ├── models/            # TypeScript Interface mirroring Strapi Models
│   │   │   ├── components/        # Navbar, Footer, SectionHeader
│   │   │   └── pages/             # 8 Halaman Lengkap sesuai spesifikasi
│   │   └── styles.css             # Tailwind CSS & Design System
│   └── tailwind.config.js
└── package.json                   # Root scripts
```

---

## 🚀 Panduan Menjalankan Proyek

### 1. Menjalankan Frontend (Angular)

```bash
cd frontend
npm install
npm start
```
Aplikasi frontend akan aktif di `http://localhost:4200/`.

> **Catatan Smart Fallback:** Jika Strapi backend belum dinyalakan, Frontend secara cerdas menggunakan *Mock Data Desa Plantungan* lengkap dengan visualisasi Chart.js dan peta Leaflet yang tetap berfungsi 100%.

### 2. Menjalankan Backend (Strapi Headless CMS)

```bash
cd backend
npm install
npm run develop
```
Panel admin Strapi akan aktif di `http://localhost:1337/admin` dan REST API di `http://localhost:1337/api/`.

---

## 🌟 Fitur Utama Website

1. **Beranda (`/`)**: Hero banner, sambutan Kepala Desa, sekilas demografi, potensi unggulan minyak rakyat, 3 berita terbaru, sorotan KKN 2025, dan quick contact.
2. **Profil Desa (`/profil`)**: Gambaran geografis 4 dusun, sejarah desa, visi-misi 5 pilar, struktur aparatur perangkat desa dengan foto & NIP, serta fasilitas umum.
3. **Data Desa (`/data-desa`)**: Visualisasi **Chart.js** interaktif (piramida kelompok usia, diagram tingkat pendidikan, diagram batang mata pencaharian, polar chart dusun).
4. **Potensi Desa (`/potensi`)**: Filter kategori (Pertanian, Sentra Minyak Rakyat Atsiri/Cengkeh, BUMDes Maju Bersama, Agrowisata).
5. **KKN 2025 (`/kkn-2025`)**: Laporan 5 divisi program kerja, galeri dokumentasi foto, dan indikator capaian pengabdian mahasiswa.
6. **Berita & Warta (`/berita` & `/berita/:slug`)**: Katalog artikel dengan pencarian & filter, detail artikel dinamis, tombol bagikan ke WhatsApp & salin link.
7. **Informasi Publik (`/informasi-publik`)**: Transparansi APBDes dengan grafik **Chart.js** (Proporsi Pendapatan & Alokasi Belanja), tabel rincian dana, dan pusat download dokumen PDF resmi.
8. **Kontak & Pelayanan (`/kontak`)**: Peta lokasi interaktif **Leaflet**, form aspirasi & pengaduan online, serta daftar nomor darurat desa.
