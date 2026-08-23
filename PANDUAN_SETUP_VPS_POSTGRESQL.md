# 📘 Panduan Lengkap Setup & Hosting Backend CMS + Database PostgreSQL di VPS
**Website Resmi Pemerintah Desa Plantungan**

Dokumen ini adalah panduan langkah-demi-langkah (*step-by-step*) untuk melakukan deployment backend Strapi Headless CMS Desa Plantungan ke server **VPS (Virtual Private Server)** seperti Ubuntu 22.04 / 24.04 LTS (DigitalOcean, Contabo, Hetzner, DomaiNesia, Niagahoster, Biznet Gio, Linode, AWS EC2, dll.) dengan database **PostgreSQL** dan penyimpanan file **Cloudflare R2**.

---

## 🏗️ Arsitektur Sistem Production

```
                          [ Pengunjung / Warga ]
                                    │
                                    ▼
                [ Domain: api.plantungan.desa.id ]
                                    │ (Port 80/443 HTTPS - SSL Let's Encrypt)
                                    ▼
                    ┌──────────────────────────────┐
                    │      Nginx Reverse Proxy     │
                    └──────────────┬───────────────┘
                                   │ (Proxy pass ke Port 1337)
                                   ▼
        ┌─────────────────────────────────────────────────────┐
        │  Node.js Backend CMS (PM2 / Docker Container)       │
        │  Port: 1337                                         │
        └──────────────┬──────────────────────────────┬───────┘
                       │                              │
                       ▼                              ▼
        ┌──────────────────────────────┐ ┌──────────────────────────────┐
        │ Database PostgreSQL 16       │ │ Cloudflare R2 Object Storage │
        │ (desa_plantungan_db)         │ │ (Foto & Dokumen PDF Desa)    │
        └──────────────────────────────┘ └──────────────────────────────┘
```

---

## 🚀 PILIHAN METODE DEPLOYMENT

Pilih salah satu metode berikut sesuai preferensi Anda:
- **METODE A (Rekomendasi - Paling Praktis)**: Menggunakan **Docker & Docker Compose** (Semua otomatis jalan dalam 1 perintah).
- **METODE B (Native VPS)**: Install PostgreSQL + Node.js + PM2 langsung di sistem operasi Ubuntu.
- **METODE C (Managed Cloud DB)**: Menggunakan PostgreSQL Cloud Gratis (seperti Supabase / Neon) + VPS Node.js.

---

## ⚡ METODE A: Deployment dengan Docker Compose (Rekomendasi)

Metode ini sangat stabil, portabel, dan tidak memerlukan instalasi manual PostgreSQL atau dependensi Node.js di host OS.

### 1. Hubungkan ke VPS melalui SSH
```bash
ssh root@IP_VPS_ANDA
```

### 2. Install Docker & Docker Compose di VPS (Ubuntu/Debian)
```bash
# Update sistem
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Verifikasi instalasi
docker --version
docker compose version
```

### 3. Upload / Clone Kode Proyek ke VPS
```bash
# Contoh clone repo atau upload folder proyek
cd /var/www
git clone <URL_REPOSITORY_ANDA> desa-plantungan
cd desa-plantungan
```

### 4. Buat File `.env` untuk Production
```bash
nano .env
```
Isi dengan konfigurasi berikut (sesuaikan password & Cloudflare R2):
```ini
# Database PostgreSQL Credentials
POSTGRES_DB=desa_plantungan_db
POSTGRES_USER=desa_user
POSTGRES_PASSWORD=PasswordDatabaseSangatAman2025!

# Cloudflare R2 Object Storage
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=desa-plantungan-media
R2_PUBLIC_URL=https://pub-subdomain.r2.dev
```
*Tekan `CTRL + O` lalu `Enter` untuk menyimpan, dan `CTRL + X` untuk keluar.*

### 5. Jalankan Container (PostgreSQL + Backend)
```bash
docker compose up -d --build
```

### 6. Cek Status Container
```bash
docker compose ps
docker compose logs -f backend
```
*Backend dan PostgreSQL Anda kini sudah aktif dan terhubung!*

---

## 🛠️ METODE B: Deployment Native di Ubuntu VPS (PostgreSQL + PM2)

Jika Anda ingin menginstall PostgreSQL dan Node.js langsung di OS VPS:

### 1. Update Server & Install Dependensi Dasar
```bash
apt update && apt upgrade -y
apt install -y curl git ufw build-essential
```

### 2. Install PostgreSQL 16 di Ubuntu
```bash
apt install -y postgresql postgresql-contrib

# Pastikan service PostgreSQL aktif
systemctl start postgresql
systemctl enable postgresql
```

### 3. Konfigurasi User & Database PostgreSQL
```bash
# Masuk ke prompt user postgres
sudo -u postgres psql
```

Jalankan perintah SQL berikut di dalam prompt psql:
```sql
-- Buat database
CREATE DATABASE desa_plantungan_db;

-- Buat user baru dengan password yang kuat
CREATE USER desa_user WITH ENCRYPTED PASSWORD PasswordDatabaseSangatAman2025!;

-- Berikan hak akses penuh ke database
GRANT ALL PRIVILEGES ON DATABASE desa_plantungan_db TO desa_user;
ALTER DATABASE desa_plantungan_db OWNER TO desa_user;

-- Keluar dari psql
\q
```

### 4. Install Node.js 20 LTS & PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 (Process Manager agar aplikasi jalan terus di background)
npm install -g pm2
```

### 5. Masuk ke Direktori Proyek & Install Dependensi
```bash
cd /var/www/desa-plantungan/backend
npm install --production
```

### 6. Buat File Konfigurasi `.env` di Folder Backend
```bash
nano .env
```
Isi file `.env`:
```ini
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Koneksi Database PostgreSQL Lokal
DATABASE_URL=postgres://desa_user:PasswordDatabaseSangatAman2025!@localhost:5432/desa_plantungan_db

# Cloudflare R2
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=desa-plantungan-media
R2_PUBLIC_URL=https://pub-subdomain.r2.dev
```

### 7. Jalankan Migrasi Data Awal ke PostgreSQL
```bash
npm run db:migrate
```
*(Perintah ini akan membaca `data-store.json` dan otomatis memasukkan seluruh data profil, perangkat, berita, APBDes, dll. ke dalam database PostgreSQL).*

### 8. Jalankan Server Menggunakan PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```
*(Salin dan jalankan perintah yang muncul dari `pm2 startup` agar aplikasi otomatis nyala saat server di-reboot).*

---

## 🌐 SETUP DOMAIN, NGINX REVERSE PROXY & SSL HTTPS

Agar backend dapat diakses melalui domain (misal: `api.plantungan.desa.id`) dengan aman (HTTPS):

### 1. Arahkan DNS Domain
Di panel domain (Cloudflare / Niagahoster / IDCloudHost):
- Buat **A Record**:
  - Name: `api` (atau `admin-desa`)
  - IPv4: `IP_ADDRESS_VPS_ANDA`

### 2. Install & Konfigurasi Nginx
```bash
apt install -y nginx

# Buat file konfigurasi Nginx
nano /etc/nginx/sites-available/desa-plantungan-backend
```

Isi dengan konfigurasi berikut:
```nginx
server {
    listen 80;
    server_name api.plantungan.desa.id;

    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Aktifkan Konfigurasi & Reload Nginx
```bash
ln -s /etc/nginx/sites-available/desa-plantungan-backend /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### 4. Pasang SSL Gratis (Let's Encrypt / Certbot)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d api.plantungan.desa.id
```
*(Certbot akan otomatis memperbarui sertifikat SSL HTTPS sebelum kedaluwarsa).*

---

## 🔒 KEAMANAN VPS & BACKUP OTOMATIS

### 1. Konfigurasi Firewall (UFW)
```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
```
*(Catatan: Jangan buka port 5432 ke publik untuk menjaga keamanan database).*

### 2. Otomatisasi Backup Database Harian (Cron Job)
```bash
# Buat direktori backup
mkdir -p /var/backups/postgres

# Buka crontab
crontab -e
```
Tambahkan baris berikut di bagian paling bawah untuk backup setiap jam 02:00 pagi:
```cron
0 2 * * * pg_dump -U desa_user -h localhost desa_plantungan_db | gzip > /var/backups/postgres/db_desa_$(date +%Y%m%d).sql.gz
```

---

## 📋 DAFTAR PERINTAH PENTING (CHEATSHEET)

| Kebutuhan | Perintah |
|---|---|
| **Cek Log Backend PM2** | `pm2 logs desa-plantungan-backend` |
| **Restart Backend PM2** | `pm2 restart desa-plantungan-backend` |
| **Cek Status PostgreSQL** | `systemctl status postgresql` |
| **Masuk ke Database CLI** | `psql -U desa_user -d desa_plantungan_db -h localhost` |
| **Backup DB Manual** | `pg_dump -U desa_user -h localhost desa_plantungan_db > backup.sql` |
| **Restore DB Manual** | `psql -U desa_user -h localhost desa_plantungan_db < backup.sql` |
| **Migrasi Data Ulang** | `cd /var/www/desa-plantungan/backend && npm run db:migrate` |

---
**Pemerintah Desa Plantungan** - *Sistem Informasi & Manajemen Administrasi Desa Digital*
