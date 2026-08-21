import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/beranda/beranda.component').then((m) => m.BerandaComponent),
    title: 'Beranda - Website Resmi Desa Plantungan'
  },
  {
    path: 'profil',
    loadComponent: () => import('./pages/profil/profil.component').then((m) => m.ProfilComponent),
    title: 'Profil & Perangkat Desa - Desa Plantungan'
  },
  {
    path: 'data-desa',
    loadComponent: () => import('./pages/data-desa/data-desa.component').then((m) => m.DataDesaComponent),
    title: 'Data & Statistik Kependudukan - Desa Plantungan'
  },
  {
    path: 'potensi',
    loadComponent: () => import('./pages/potensi/potensi.component').then((m) => m.PotensiComponent),
    title: 'Potensi Minyak Rakyat & Pertanian - Desa Plantungan'
  },
  {
    path: 'kkn-2025',
    loadComponent: () => import('./pages/kkn-2025/kkn-2025.component').then((m) => m.KKNComponent),
    title: 'Program KKN Mahasiswa 2025 - Desa Plantungan'
  },
  {
    path: 'berita',
    loadComponent: () => import('./pages/berita/berita-list/berita-list.component').then((m) => m.BeritaListComponent),
    title: 'Berita & Agenda Kegiatan - Desa Plantungan'
  },
  {
    path: 'berita/:slug',
    loadComponent: () => import('./pages/berita/berita-detail/berita-detail.component').then((m) => m.BeritaDetailComponent),
    title: 'Detail Berita - Desa Plantungan'
  },
  {
    path: 'informasi-publik',
    loadComponent: () => import('./pages/informasi-publik/informasi-publik.component').then((m) => m.InformasiPublikComponent),
    title: 'Transparansi APBDes & Informasi Publik - Desa Plantungan'
  },
  {
    path: 'apbdes',
    redirectTo: 'informasi-publik',
    pathMatch: 'full'
  },
  {
    path: 'transparansi-apbdes',
    redirectTo: 'informasi-publik',
    pathMatch: 'full'
  },
  {
    path: 'kontak',
    loadComponent: () => import('./pages/kontak/kontak.component').then((m) => m.KontakComponent),
    title: 'Kontak & Peta Lokasi - Desa Plantungan'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
