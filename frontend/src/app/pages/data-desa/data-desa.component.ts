import { Component, OnInit, AfterViewInit, inject, signal, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { StrapiService } from '../../core/strapi.service';
import { DataKependudukan } from '../../models/data-kependudukan.model';

Chart.register(...registerables);

@Component({
  selector: 'app-data-desa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-desa.component.html',
  styleUrls: ['./data-desa.component.css']
})
export class DataDesaComponent implements OnInit, AfterViewInit, OnDestroy {
  private strapi = inject(StrapiService);
  public data = signal<DataKependudukan | null>(null);

  @ViewChild('usiaChartCanvas') usiaChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pendidikanChartCanvas') pendidikanChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pekerjaanChartCanvas') pekerjaanChartCanvas!: ElementRef<HTMLCanvasElement>;

  private charts: Chart[] = [];

  ngOnInit(): void {
    this.strapi.getDataKependudukan().subscribe((res) => {
      this.data.set(res);
      setTimeout(() => this.renderCharts(), 50);
    });
  }

  ngAfterViewInit(): void {
    if (this.data()) {
      this.renderCharts();
    }
  }

  private renderCharts(): void {
    const d = this.data();
    if (!d) return;

    this.destroyCharts();

    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

    // 1. Chart Usia
    if (this.usiaChartCanvas) {
      const usiaCtx = this.usiaChartCanvas.nativeElement.getContext('2d');
      if (usiaCtx) {
        const labels = d.kelompok_usia.map((k) => k.rentang);
        const dataValues = d.kelompok_usia.map((k) => k.jumlah);

        const chart = new Chart(usiaCtx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Total Jiwa',
                data: dataValues,
                backgroundColor: '#10b981',
                hoverBackgroundColor: '#059669',
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.65
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#0f172a',
                padding: 12,
                titleFont: { size: 13, weight: 'bold' },
                bodyFont: { size: 12 },
                cornerRadius: 8,
                callbacks: {
                  label: (ctx) => ` ${(ctx.parsed.y ?? 0).toLocaleString('id-ID')} Jiwa`
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: '#f1f5f9' },
                ticks: {
                  color: '#64748b',
                  font: { size: 11 },
                  callback: (val) => Number(val).toLocaleString('id-ID')
                }
              },
              x: {
                grid: { display: false },
                ticks: { color: '#64748b', font: { size: 11, weight: 'bold' } }
              }
            }
          }
        });
        this.charts.push(chart);
      }
    }

    // 2. Chart Pendidikan
    if (this.pendidikanChartCanvas) {
      const pndCtx = this.pendidikanChartCanvas.nativeElement.getContext('2d');
      if (pndCtx) {
        const labels = d.tingkat_pendidikan.map((p) => p.tingkat);
        const values = d.tingkat_pendidikan.map((p) => p.jumlah);

        const chart = new Chart(pndCtx, {
          type: 'doughnut',
          data: {
            labels,
            datasets: [
              {
                data: values,
                backgroundColor: [
                  '#94a3b8',
                  '#10b981',
                  '#0ea5e9',
                  '#6366f1',
                  '#f59e0b'
                ],
                borderWidth: 3,
                borderColor: '#ffffff',
                hoverOffset: 6
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '68%',
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  usePointStyle: true,
                  padding: 16,
                  font: { size: 11, weight: 'bold' },
                  color: '#334155'
                }
              },
              tooltip: {
                backgroundColor: '#0f172a',
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                  label: (ctx) => {
                    const total = (ctx.dataset.data as number[]).reduce((a, b) => a + b, 0);
                    const val = ctx.raw as number;
                    const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0';
                    return ` ${val.toLocaleString('id-ID')} Jiwa (${pct}%)`;
                  }
                }
              }
            }
          }
        });
        this.charts.push(chart);
      }
    }

    // 3. Chart Mata Pencaharian
    if (this.pekerjaanChartCanvas) {
      const pkrCtx = this.pekerjaanChartCanvas.nativeElement.getContext('2d');
      if (pkrCtx) {
        const labels = d.mata_pencaharian.map((m) => m.sektor);
        const values = d.mata_pencaharian.map((m) => m.jumlah);

        const chart = new Chart(pkrCtx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Jumlah Pekerja (Jiwa)',
                data: values,
                backgroundColor: '#0d9488',
                hoverBackgroundColor: '#0f766e',
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.65
              }
            ]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#0f172a',
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                  label: (ctx) => ` ${(ctx.parsed.x ?? 0).toLocaleString('id-ID')} Jiwa`
                }
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                grid: { color: '#f1f5f9' },
                ticks: {
                  color: '#64748b',
                  font: { size: 11 },
                  callback: (val) => Number(val).toLocaleString('id-ID')
                }
              },
              y: {
                grid: { display: false },
                ticks: { color: '#334155', font: { size: 12, weight: 'bold' } }
              }
            }
          }
        });
        this.charts.push(chart);
      }
    }
  }

  private destroyCharts(): void {
    for (const c of this.charts) {
      c.destroy();
    }
    this.charts = [];
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }
}
