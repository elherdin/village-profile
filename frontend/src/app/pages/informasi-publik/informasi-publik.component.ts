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
  public selectedId = signal<number | null>(null);

  public currentAPBDes = computed<APBDes | null>(() => {
    const list = this.apbdesList();
    const id = this.selectedId();
    if (id !== null) {
      const found = list.find((a) => a.id === id);
      if (found) return found;
    }
    return list.length > 0 ? list[0] : null;
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
      const sorted = [...(res || [])].sort((a, b) => {
        const diffYear = (Number(b.tahun) || 0) - (Number(a.tahun) || 0);
        if (diffYear !== 0) return diffYear;
        return (Number(b.id) || 0) - (Number(a.id) || 0);
      });
      this.apbdesList.set(sorted);
      if (sorted.length > 0) {
        if (!sorted.some(a => a.id === this.selectedId())) {
          this.selectedId.set(sorted[0].id ?? null);
        }
      }
    });
  }

  selectAPBDes(id: number | undefined): void {
    if (id !== undefined) {
      this.selectedId.set(id);
    }
  }

  getTabLabel(item: APBDes): string {
    const list = this.apbdesList();
    const sameYearItems = list.filter((a) => a.tahun === item.tahun);
    if (sameYearItems.length > 1) {
      if (item.status_publikasi) {
        const shortStatus = item.status_publikasi.replace(/Perdes\s*No\.?\s*[0-9\/]+/gi, '').replace(/[\(\)]/g, '').trim();
        if (shortStatus && shortStatus.length <= 25) {
          return `Tahun ${item.tahun} (${shortStatus})`;
        }
      }
      const idx = sameYearItems.findIndex((a) => a.id === item.id);
      return `Tahun ${item.tahun} #${idx + 1}`;
    }
    return `Tahun ${item.tahun}`;
  }

  formatRupiah(nominal: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(nominal || 0);
  }
}
