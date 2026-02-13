import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ViewMode = 'list' | 'grid';

@Component({
  selector: 'app-view-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-toggle.component.html',
  styleUrls: ['./view-toggle.component.scss']
})
export class ViewToggleComponent {
  @Input() activeView: ViewMode = 'list';
  @Output() viewChange = new EventEmitter<ViewMode>();

  setView(view: ViewMode): void {
    this.activeView = view;
    this.viewChange.emit(view);
  }
}
