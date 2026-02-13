import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../../core/models/menu.model';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent {
  @Input({ required: true }) item!: MenuItem;
  @Input() isCollapsed = false;
  @Input() isChild = false;
  @Output() toggle = new EventEmitter<string>();

  get hasChildren(): boolean {
    return !!this.item.children && this.item.children.length > 0;
  }

  onToggle(): void {
    if (this.hasChildren) {
      this.toggle.emit(this.item.id);
    }
  }
}
