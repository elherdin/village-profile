export interface RincianAnggaranItem {
  kategori: string;
  nominal: number;
  persentase?: number;
  keterangan?: string;
}

export interface APBDes {
  id?: number;
  tahun: number;
  pendapatan: number;
  belanja: number;
  pembiayaan?: number;
  surplus_defisit?: number;
  rincian_pendapatan: RincianAnggaranItem[];
  rincian_belanja: RincianAnggaranItem[];
  file_pdf?: string;
  keterangan?: string;
  status_publikasi?: string;
}
