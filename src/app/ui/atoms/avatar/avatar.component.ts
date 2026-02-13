import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() src?: string;
  @Input() alt = 'Avatar';
  @Input() size: AvatarSize = 'md';
  @Input() initials?: string;
  @Input() status?: 'online' | 'offline' | 'away' | 'busy';

  get avatarClasses(): string {
    return [
      'avatar',
      `avatar--${this.size}`,
      this.status ? `avatar--${this.status}` : ''
    ].filter(Boolean).join(' ');
  }

  get displayInitials(): string {
    if (this.initials) {
      return this.initials.substring(0, 2).toUpperCase();
    }
    return this.alt.substring(0, 2).toUpperCase();
  }

  onImageError(): void {
    this.src = undefined;
  }
}
