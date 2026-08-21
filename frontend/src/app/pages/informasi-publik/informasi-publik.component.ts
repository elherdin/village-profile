import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from '../../core/strapi.service';
import { APBDes } from '../../models/apbdes.model';

@Component({
  selector: 'app-informasi-publik',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './informasi-publik.component.html',
  styleUrls: ['./informasi-publik.component.css']
})
export class InformasiPublikComponent implements OnInit {
  private strapi = inject(StrapiService);
  public apbdesList = signal<APBDes[]>([]);
  public selectedYear = signal<number>(2025);

  public currentAPBDes = computed<APBDes | null>(() => {
    const list = this.apbdesList();
    const yr = this.selectedYear();
    return list.find((a) => a.tahun === yr) || (list.length > 0 ? list[0] : null);
  });

  public totalRincianPendapatan = computed<number>(() => {
    const apb = this.currentAPBDes();
    if (!apb || !apb.rincian_pendapatan) return 0;
    return apb.rincian_pendapatan.reduce((sum, item) => sum + (Number(item.nominal) || 0), 0);
  });

  public selisihPendapatan = computed<number>(() => {
    const apb = this.currentAPBDes();
    if (!apb) return 0;
    return this.totalRincianPendapatan() - (Number(apb.pendapatan) || 0);
  });

  public totalRincianBelanja = computed<number>(() => {
    const apb = this.currentAPBDes();
    if (!apb || !apb.rincian_belanja) return 0;
    return apb.rincian_belanja.reduce((sum, item) => sum + (Number(item.nominal) || 0), 0);
  });

  public selisihBelanja = computed<number>(() => {
    const apb = this.currentAPBDes();
    if (!apb) return 0;
    return this.totalRincianBelanja() - (Number(apb.belanja) || 0);
  });

  ngOnInit(): void {
    this.strapi.getAPBDes().subscribe((res) => {
      const sorted = [...(res || [])].sort((a, b) => (Number(b.tahun) || 0) - (Number(a.tahun) || 0));
      this.apbdesList.set(sorted);
      if (sorted.length > 0) {
        if (!sorted.some(a => a.tahun === this.selectedYear())) {
          this.selectedYear.set(sorted[0].tahun);
        }
      }
    });
  }

  selectYear(yr: number): void {
    this.selectedYear.set(yr);
  }

  formatRupiah(nominal: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(nominal || 0);
  }
}
