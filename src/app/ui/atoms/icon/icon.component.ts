import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input({ required: true }) name!: string;
  @Input() size: IconSize = 'md';
  @Input() color?: string;

  get iconClasses(): string {
    return [
      'icon',
      'material-icons',
      `icon--${this.size}`
    ].join(' ');
  }
}
