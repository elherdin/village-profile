import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.css']
})
export class SectionHeaderComponent {
  @Input() badge?: string;
  @Input() badgeColor: 'desa' | 'gold' = 'desa';
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
  @Input() align: 'left' | 'center' = 'center';
}
