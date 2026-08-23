# 🌐 Panduan Lengkap Hosting Frontend Angular di Vercel
**Website Resmi Pemerintah Desa Plantungan**

Hosting frontend Angular di **Vercel** adalah pilihan terbaik karena **100% Gratis**, memiliki **Global CDN berkecepatan tinggi**, **SSL HTTPS Otomatis**, dan **Auto Deploy** setiap kali ada update di GitHub/GitLab.

---

## 📋 Ringkasan Alur Hosting

1. **Sesuaikan URL Backend di File Environment**.
2. **Push Kode Proyek ke GitHub / GitLab**.
3. **Impor Proyek ke Dashboard Vercel**.
4. **Atur Build Settings di Vercel**.
5. **Klik Deploy** (Website langsung aktif online).
6. *(Opsional)* **Hubungkan Custom Domain Desa** (misal: `plantungan.desa.id`).

---

## 🛠️ LANGKAH-LANGKAH DETAIL

### 1️⃣ Langkah 1: Sesuaikan URL Backend Produksi
Sebelum deploy, pastikan URL backend pada file `frontend/src/environments/environment.prod.ts` sudah mengarah ke backend Anda di Coolify:

Buka file [`frontend/src/environments/environment.prod.ts`](file:///Users/macbookair/Documents/ANGULAR%20COURSE/desa-plantungan/frontend/src/environments/environment.prod.ts):
```typescript
export const environment = {
  production: true,
  // Ganti dengan URL domain backend Coolify Anda:
  apiUrl: https://api.plantungan.desa.id/api,
  backendUrl: https://api.plantungan.desa.id
};
```

---

### 2️⃣ Langkah 2: Push Kode ke GitHub
Pastikan seluruh folder proyek Anda sudah di-push ke GitHub:
```bash
git add .
git commit -m "Siap deploy frontend ke Vercel"
git push origin main
```

---

### 3️⃣ Langkah 3: Impor Proyek di Vercel
1. Buka [https://vercel.com](https://vercel.com) dan login menggunakan akun GitHub Anda.
2. Di Dashboard Vercel, klik tombol **Add New...** -> Pilih **Project**.
3. Cari repository proyek Anda (misal `desa-plantungan`), lalu klik **Import**.

---

### 4️⃣ Langkah 4: Konfigurasi Build Settings di Vercel
Pada halaman **Configure Project** di Vercel, atur hal-hal berikut:

1. **Project Name**: `desa-plantungan` *(atau sesuai keinginan Anda)*
2. **Framework Preset**: Pilih **Angular**
3. **Root Directory**: Klik **Edit** dan pilih folder **`frontend`**
4. **Build and Output Settings**:
   - **Build Command**: `npm run build` *(default)*
   - **Output Directory**: `dist/frontend-desa-plantungan/browser` *(default Angular 18)*
   - **Install Command**: `npm install` *(default)*

> 💡 **Catatan SPA Routing (Anti 404 saat Refresh):**
> Kami telah menyertakan file [`frontend/vercel.json`](file:///Users/macbookair/Documents/ANGULAR%20COURSE/desa-plantungan/frontend/vercel.json) di dalam proyek. Vercel akan otomatis membaca aturan *rewrite* ini sehingga saat pengunjung me-refresh halaman seperti `/profil`, `/data-desa`, atau `/kkn-2025`, tidak akan terjadi error 404!

---

### 5️⃣ Langkah 5: Klik Deploy!
1. Klik tombol **Deploy** di bagian bawah.
2. Tunggu proses build sekitar 1 - 2 menit.
3. Setelah selesai, Anda akan melihat animasi kembang api 🎉 dan domain gratis dari Vercel (contoh: `https://desa-plantungan.vercel.app`).
4. Klik tautan tersebut untuk membuka website desa Anda secara langsung!

---

### 6️⃣ Langkah 6 (Opsional): Hubungkan Custom Domain Desa
Jika Pemerintah Desa Plantungan memiliki domain resmi (contoh: `plantungan.desa.id` atau `desaplantungan.id`):

1. Di Dashboard Proyek Vercel, buka menu **Settings** -> **Domains**.
2. Masukkan nama domain Anda (misal: `plantungan.desa.id` atau `www.plantungan.desa.id`).
3. Vercel akan menampilkan instruksi DNS:
   - **CNAME Record**: `cname.vercel-dns.com` (untuk subdomain/www)
   - Atau **A Record**: `76.76.21.21` (untuk apex domain)
4. Tambahkan record tersebut di panel DNS domain Anda (Cloudflare / Niagahoster / IDCloudHost / Kominfo).
5. Vercel akan otomatis menerbitkan **Sertifikat SSL HTTPS** gratis dalam beberapa menit!

---

## 🔄 Pembaruan Otomatis (Continuous Deployment)
Setiap kali Anda mengedit frontend di komputer lokal dan melakukan `git push` ke GitHub, Vercel akan **secara otomatis melakukan build dan update website dalam hitungan detik** tanpa perlu login ke Vercel lagi.

---
**Pemerintah Desa Plantungan** - *Sistem Informasi & Manajemen Administrasi Desa Digital*
