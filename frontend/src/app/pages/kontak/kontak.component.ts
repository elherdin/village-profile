import { Component, OnInit, AfterViewInit, OnDestroy, inject, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { StrapiService } from '../../core/strapi.service';
import { SectionHeaderComponent } from '../../components/section-header/section-header.component';
import { ProfilDesa } from '../../models/profil-desa.model';

@Component({
  selector: 'app-kontak',
  standalone: true,
  imports: [CommonModule, FormsModule, SectionHeaderComponent],
  templateUrl: './kontak.component.html',
  styleUrls: ['./kontak.component.css']
})
export class KontakComponent implements OnInit, AfterViewInit, OnDestroy {
  private strapi = inject(StrapiService);
  public profil = signal<ProfilDesa | null>(null);
  public submitMessage = signal<string | null>(null);
  public isSubmitting = signal<boolean>(false);

  public formData = {
    nama: '',
    email: '',
    telepon: '',
    subjek: 'Pelayanan Administrasi Kependudukan',
    pesan: ''
  };

  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;
  private map?: L.Map;

  ngOnInit(): void {
    this.strapi.getProfilDesa().subscribe((res) => {
      this.profil.set(res);
      if (this.map && res.koordinat) {
        this.map.setView([res.koordinat.latitude, res.koordinat.longitude], res.koordinat.zoom);
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    if (typeof window === 'undefined' || !this.mapContainer) return;

    const lat = this.profil()?.koordinat?.latitude || -6.8892678;
    const lng = this.profil()?.koordinat?.longitude || 111.4723041;
    const zoom = this.profil()?.koordinat?.zoom || 15;

    this.map = L.map(this.mapContainer.nativeElement, {
      center: [lat, lng],
      zoom: zoom,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    const icon = L.divIcon({
      className: 'custom-pin',
      html: `<div style="background-color: #059669; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">🏛️</div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    const marker = L.marker([lat, lng], { icon }).addTo(this.map);
    marker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 13px; line-height: 1.4;">
        <strong style="color: #059669; font-size: 14px;">Desa Plantungan</strong><br/>
        Kecamatan Blora, Kabupaten Blora<br/>
        Jawa Tengah 58219, Indonesia
      </div>
    `).openPopup();
  }

  submitForm(): void {
    if (!this.formData.nama || !this.formData.pesan) return;

    this.isSubmitting.set(true);
    this.strapi.kirimPesanKontak(this.formData).subscribe((res) => {
      this.isSubmitting.set(false);
      this.submitMessage.set(res.message);
      this.formData = {
        nama: '',
        email: '',
        telepon: '',
        subjek: 'Pelayanan Administrasi Kependudukan',
        pesan: ''
      };
      setTimeout(() => this.submitMessage.set(null), 8000);
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
