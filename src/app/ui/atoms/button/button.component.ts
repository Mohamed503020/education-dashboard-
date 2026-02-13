import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  get buttonClasses(): string {
    return [
      'button',
      `button--${this.variant}`,
      `button--${this.size}`,
      this.fullWidth ? 'button--full-width' : '',
      this.icon ? 'button--with-icon' : '',
      this.disabled ? 'button--disabled' : ''
    ].filter(Boolean).join(' ');
  }
}
