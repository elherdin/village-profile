export interface KelompokUsiaItem {
  rentang: string;
  jumlah: number;
  laki_laki?: number;
  perempuan?: number;
}

export interface TingkatPendidikanItem {
  tingkat: string;
  jumlah: number;
  persentase?: number;
}

export interface MataPencaharianItem {
  sektor: string;
  jumlah: number;
  persentase?: number;
}

export interface DistribusiDusunItem {
  dusun: string;
  jumlah_jiwa: number;
  jumlah_kk?: number;
  laki_laki?: number;
  perempuan?: number;
}

export interface DataKependudukan {
  id?: number;
  total_penduduk: number;
  total_kk?: number;
  laki_laki: number;
  perempuan: number;
  kelompok_usia: KelompokUsiaItem[];
  tingkat_pendidikan: TingkatPendidikanItem[];
  mata_pencaharian: MataPencaharianItem[];
  distribusi_dusun: DistribusiDusunItem[];
  tahun_update: number;
}
