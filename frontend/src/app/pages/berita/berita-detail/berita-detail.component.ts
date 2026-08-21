import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StrapiService } from '../../../core/strapi.service';
import { Berita } from '../../../models/berita.model';

@Component({
  selector: 'app-berita-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './berita-detail.component.html',
  styleUrls: ['./berita-detail.component.css']
})
export class BeritaDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private strapi = inject(StrapiService);

  public berita = signal<Berita | null>(null);
  public otherBerita = signal<Berita[]>([]);
  public copied = signal<boolean>(false);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.strapi.getBeritaBySlug(slug).subscribe((res) => {
          this.berita.set(res);
        });
      }
    });

    this.strapi.getBerita().subscribe((list) => {
      this.otherBerita.set(list.slice(0, 2));
    });
  }

  shareWhatsApp(): void {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(this.berita()?.judul || 'Berita Desa Plantungan');
      window.open(`https://api.whatsapp.com/send?text=${title}%20-%20${url}`, '_blank');
    }
  }

  copyLink(): void {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2500);
    }
  }
}
