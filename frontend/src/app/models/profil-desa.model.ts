export interface VisiMisi {
  visi: string;
  misi: string[];
  motto?: string;
}

export interface KoordinatDesa {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface ProfilDesa {
  id?: number;
  nama_desa: string;
  tagline?: string;
  logo?: string;
  nama_kades?: string;
  foto_kades?: string;
  foto_desa?: string;
  foto_kantor?: string;
  tentang: string;
  sejarah: string;
  visi_misi: VisiMisi;
  alamat: string;
  email: string;
  telepon: string;
  koordinat?: KoordinatDesa;
  luas_wilayah?: string;
  jumlah_dusun?: number;
  jumlah_rt?: number;
  jumlah_rw?: number;
}
