import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LiveStreamService } from '../../../../core/services/live-stream.service';

@Component({
  selector: 'app-active-streams',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="active-streams">
      <div class="page-header">
        <h1><span class="material-icons">sensors</span> Active Live Streams</h1>
      </div>

      <div class="streams-grid" *ngIf="streams.length > 0">
        <div *ngFor="let stream of streams" class="stream-card">
          <div class="stream-header">
            <span class="live-badge"><span class="dot"></span> LIVE</span>
          </div>
          <h3>{{ stream.title }}</h3>
          <p>{{ stream.description }}</p>
          <div class="stream-info">
            <span><span class="material-icons sm">person</span> {{ stream.teacher?.firstName || 'Teacher' }}</span>
            <span><span class="material-icons sm">people</span> {{ stream.participants?.length || 0 }} watching</span>
          </div>
          <a [routerLink]="['/live', stream._id]" class="btn-join">
            <span class="material-icons">play_arrow</span> Join Stream
          </a>
        </div>
      </div>

      <div class="empty" *ngIf="streams.length === 0 && !loading">
        <span class="material-icons big">videocam_off</span>
        <h3>No Active Streams</h3>
        <p>There are no live streams happening right now. Check back later!</p>
      </div>

      <div class="loading" *ngIf="loading">
        <p>Loading streams...</p>
      </div>
    </div>
  `,
  styles: [`
    .active-streams {
      padding: 1.5rem;
      max-width: 1100px;
    }
    .page-header {
      margin-bottom: 1.5rem;
      h1 {
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        .material-icons { color: #d32f2f; }
      }
    }
    .streams-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.2rem;
    }
    .stream-card {
      background: #fff;
      border-radius: 12px;
      padding: 1.2rem;
      box-shadow: 0 2px 12px rgba(0,0,0,0.06);
      border-left: 4px solid #d32f2f;
      .stream-header { margin-bottom: 0.5rem; }
      .live-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        color: #d32f2f;
        font-weight: 700;
        font-size: 0.75rem;
        .dot {
          width: 8px;
          height: 8px;
          background: #d32f2f;
          border-radius: 50%;
          animation: pulse 1s infinite;
        }
      }
      h3 { margin: 0 0 0.3rem; font-size: 1rem; }
      p { margin: 0 0 0.6rem; color: #666; font-size: 0.85rem; }
      .stream-info {
        display: flex;
        gap: 1rem;
        margin-bottom: 0.8rem;
        font-size: 0.8rem;
        color: #888;
        span {
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }
        .sm { font-size: 1rem; }
      }
      .btn-join {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        background: #d32f2f;
        color: #fff;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.85rem;
        &:hover { background: #b71c1c; }
        .material-icons { font-size: 1.1rem; }
      }
    }
    .empty {
      text-align: center;
      padding: 3rem;
      .big { font-size: 4rem; color: #ccc; }
      h3 { margin: 0.5rem 0 0.3rem; }
      p { color: #888; }
    }
    .loading { text-align: center; padding: 2rem; color: #888; }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
  `]
})
export class ActiveStreamsComponent implements OnInit {
  private liveStreamService = inject(LiveStreamService);
  streams: any[] = [];
  loading = true;

  ngOnInit(): void {
    this.liveStreamService.getActiveLiveStreams().subscribe({
      next: (res) => { this.streams = res; this.loading = false; },
      error: () => { this.streams = []; this.loading = false; }
    });
  }
}
