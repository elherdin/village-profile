# 🚀 Panduan Lengkap Hosting Backend CMS + PostgreSQL Menggunakan Coolify
**Website Resmi Pemerintah Desa Plantungan**

**Coolify** adalah platform *Self-Hosted PaaS* (seperti Vercel / Heroku di VPS Anda sendiri) yang sangat praktis. Coolify menangani **SSL HTTPS Otomatis**, **Database PostgreSQL 1-Klik**, **Git Auto-Deploy**, dan **Reverse Proxy Traefik** secara otomatis.

---

## 📋 Ringkasan Langkah di Coolify

1. **Buat Database PostgreSQL** (1-Klik di Coolify).
2. **Buat Aplikasi Backend** dari Git Repository.
3. **Isi Environment Variables** (`DATABASE_URL` & Cloudflare R2).
4. **Isi Domain / Subdomain** (SSL HTTPS otomatis aktif).
5. **Klik Deploy** (Backend & PostgreSQL otomatis tersambung & data termigrasi).

---

## 🛠️ LANGKAH-LANGKAH DETAIL

### 1️⃣ Langkah 1: Buat Database PostgreSQL di Coolify
1. Buka dashboard **Coolify** Anda.
2. Masuk ke **Project** & **Environment** Anda (misal: `Production`).
3. Klik tombol **+ New Resource**.
4. Pilih **PostgreSQL**.
5. Isi konfigurasi dasar:
   - **Name**: `postgres-desa`
   - **Database Name**: `desa_plantungan_db`
   - **User**: `desa_user`
   - **Password**: *(klik generate password yang aman)*
6. Klik **Save** lalu klik **Start Database**.
7. Buka tab **General** / **Credentials**, lalu salin **Internal Connection String / URL**, contohnya:
   ```text
   postgresql://desa_user:password_anda@postgres-desa:5432/desa_plantungan_db
   ```

---

### 2️⃣ Langkah 2: Hubungkan & Buat Resource Backend
1. Kembali ke halaman Project Anda di Coolify, klik **+ New Resource**.
2. Pilih sumber kode Git Anda:
   - **Public Repository** (jika repo bersifat publik di GitHub/GitLab).
   - Atau **GitHub App / Private Repository** (jika repo bersifat privat).
3. Masukkan URL Repository Anda (contoh: `https://github.com/username/desa-plantungan`).
4. Pada form konfigurasi aplikasi:
   - **Base Directory**: `/backend` *(karena folder backend berada di subfolder `/backend`)*
   - **Build Pack**: Pilih **Dockerfile** *(Coolify akan otomatis mendeteksi `backend/Dockerfile`)* atau **Nixpacks**.
   - **Port**: `1337`
   - **Domains**: Masukkan domain / subdomain API Anda dengan awalan `https://`, contoh:
     ```
     https://api.plantungan.desa.id
     ```
     *(Atau gunakan temporary domain gratis bawaan Coolify seperti `https://api-desa.xxx.sslip.io`)*

---

### 3️⃣ Langkah 3: Masukkan Environment Variables di Coolify
Buka tab **Environment Variables** pada aplikasi backend di Coolify, lalu masukkan variabel berikut:

| Key / Nama Variabel | Value / Nilai Contoh | Keterangan |
|---|---|---|
| `NODE_ENV` | `production` | Mode produksi |
| `PORT` | `1337` | Port aplikasi |
| `DATABASE_URL` | `postgresql://desa_user:password@postgres-desa:5432/desa_plantungan_db` | URL Database PostgreSQL dari Langkah 1 |
| `R2_ACCOUNT_ID` | `your_cloudflare_account_id` | Akun Cloudflare |
| `R2_ACCESS_KEY_ID` | `your_r2_access_key_id` | R2 Access Key |
| `R2_SECRET_ACCESS_KEY` | `your_r2_secret_access_key` | R2 Secret Key |
| `R2_BUCKET_NAME` | `desa-plantungan-media` | Nama Bucket R2 |
| `R2_PUBLIC_URL` | `https://pub-subdomain.r2.dev` | URL Publik R2 |

> 💡 **Fitur Otomatisasi Database:**
> Backend Desa Plantungan sudah dilengkapi **Auto-Seed Otomatis**. Saat backend pertama kali di-deploy dan terhubung ke database PostgreSQL yang masih kosong, backend akan **secara otomatis memasukkan seluruh data dari `data-store.json` ke PostgreSQL** tanpa perlu menjalankan perintah migrasi manual!

---

### 4️⃣ Langkah 4: Deploy Aplikasi
1. Klik tombol **Deploy** di pojok kanan atas aplikasi Coolify.
2. Tunggu proses build selesai (sekitar 30 - 60 detik).
3. Pantau tab **Logs** di Coolify. Anda akan melihat log seperti ini:
   ```text
   ======================================================
   Strapi Headless CMS Desa Plantungan Berjalan!
   PostgreSQL:   Terkoneksi (Database Aktif)
   Cloudflare R2: Terkoneksi
   Admin Panel:  http://0.0.0.0:1337/admin
   REST API:     http://0.0.0.0:1337/api/
   ======================================================
   [PostgreSQL] Data berhasil disinkronkan ke memori server!
   ```

---

### 5️⃣ Langkah 5: Hubungkan Frontend ke Backend Coolify
Setelah backend aktif di domain Anda (misal `https://api.plantungan.desa.id`), Anda tinggal memperbarui URL API di frontend:

1. Di file `frontend/src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: https://api.plantungan.desa.id/api,
     mediaUrl: https://api.plantungan.desa.id
   };
   ```
2. Frontend siap di-deploy ke Vercel / Netlify / Cloudflare Pages / Coolify!

---

## 🎯 Keunggulan Menggunakan Coolify untuk Backend Ini:

1. **Auto SSL (HTTPS Gratis)**: Coolify dan Traefik otomatis menerbitkan sertifikat SSL Let's Encrypt untuk domain Anda.
2. **Auto Deploy on Push**: Setiap kali Anda melakukan `git push` ke repository, Coolify akan otomatis membangun ulang dan mengupdate backend tanpa *downtime*.
3. **Database Backup Terjadwal**: Di menu PostgreSQL Coolify, Anda bisa mengaktifkan backup terjadwal (misal: harian) ke S3/R2 atau penyimpanan lokal server hanya dengan 1 centang.
4. **Pemantauan Resource (CPU & RAM)**: Coolify menyediakan grafik performa server dan penggunaan memori secara *real-time*.

---
**Pemerintah Desa Plantungan** - *Sistem Informasi & Manajemen Administrasi Desa Digital*
