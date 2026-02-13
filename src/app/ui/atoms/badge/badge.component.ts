import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'primary';
  @Input() pill = false;

  get badgeClasses(): string {
    return [
      'badge',
      `badge--${this.variant}`,
      this.pill ? 'badge--pill' : ''
    ].filter(Boolean).join(' ');
  }
}
