import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LiveStreamService } from '../../../../core/services/live-stream.service';
import { CourseService } from '../../../../core/services/course.service';
import { AuthService } from '../../../../core/services/auth.service';
import { LiveStream } from '../../../../core/models/live-stream.model';
import { CreateLiveStreamRequest } from '../../../../core/models/live-stream.model';
import { Course } from '../../../../core/models/course.model';

@Component({
  selector: 'app-teacher-live-manage',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  template: `
    <div class="live-manage">
      <div class="page-header">
        <h1>Live Stream Management</h1>
        <button class="btn btn-primary" (click)="showCreateModal = true">
          + Create Live Stream
        </button>
      </div>

      @if (isLoading) {
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading streams...</p>
        </div>
      } @else {
        <div class="streams-section">
          <h2>Active Streams</h2>
          @if (activeStreams.length === 0) {
            <div class="empty-state">
              <p>No active streams</p>
            </div>
          } @else {
            <div class="streams-grid">
              @for (stream of activeStreams; track stream._id) {
                <div class="stream-card live">
                  <div class="stream-badge">🔴 LIVE</div>
                  <h3>{{ stream.title }}</h3>
                  <p>{{ stream.participants.length }} participants</p>
                  <div class="stream-actions">
                    <button class="btn btn-sm btn-primary" [routerLink]="['/live', stream._id]">
                      View Stream
                    </button>
                    <button class="btn btn-sm btn-danger" (click)="endStream(stream)">
                      End Stream
                    </button>
                  </div>
                </div>
              }
            </div>
          }
        </div>

        <div class="streams-section">
          <h2>Scheduled Streams</h2>
          @if (scheduledStreams.length === 0) {
            <div class="empty-state">
              <p>No scheduled streams</p>
            </div>
          } @else {
            <div class="streams-grid">
              @for (stream of scheduledStreams; track stream._id) {
                <div class="stream-card scheduled">
                  <div class="stream-badge scheduled">📅 Scheduled</div>
                  <h3>{{ stream.title }}</h3>
                  <p>{{ stream.scheduledStartTime | date:'medium' }}</p>
                  <div class="stream-actions">
                    <button class="btn btn-sm btn-success" (click)="startStream(stream)">
                      Start Now
                    </button>
                    <button class="btn btn-sm btn-outline" (click)="deleteStream(stream)">
                      Cancel
                    </button>
                  </div>
                </div>
              }
            </div>
          }
        </div>

        <div class="streams-section">
          <h2>Past Streams</h2>
          @if (pastStreams.length === 0) {
            <div class="empty-state">
              <p>No past streams</p>
            </div>
          } @else {
            <div class="streams-grid">
              @for (stream of pastStreams; track stream._id) {
                <div class="stream-card past">
                  <h3>{{ stream.title }}</h3>
                  <p>Ended: {{ stream.endTime | date:'medium' }}</p>
                  @if (stream.recordingUrl) {
                    <a [href]="stream.recordingUrl" target="_blank" class="recording-link">
                      📹 View Recording
                    </a>
                  }
                </div>
              }
            </div>
          }
        </div>
      }
    </div>

    <!-- Create Modal -->
    @if (showCreateModal) {
      <div class="modal-overlay" (click)="showCreateModal = false">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Create Live Stream</h2>
            <button class="close-btn" (click)="showCreateModal = false">×</button>
          </div>
          
          <form [formGroup]="createForm" (ngSubmit)="createStream()">
            <div class="form-group">
              <label>Title</label>
              <input 
                type="text" 
                formControlName="title"
                class="form-control"
                placeholder="Enter stream title"
              >
            </div>

            <div class="form-group">
              <label>Description</label>
              <textarea 
                formControlName="description"
                class="form-control"
                rows="3"
                placeholder="Enter stream description"
              ></textarea>
            </div>

            <div class="form-group">
              <label>Course</label>
              <select formControlName="courseId" class="form-control">
                <option value="">Select a course</option>
                @for (course of myCourses; track course._id) {
                  <option [value]="course._id">{{ course.title }}</option>
                }
              </select>
            </div>

            <div class="form-group">
              <label>Schedule for later?</label>
              <input 
                type="datetime-local" 
                formControlName="scheduledAt"
                class="form-control"
              >
            </div>

            <div class="form-group">
              <label>Max Participants</label>
              <input 
                type="number" 
                formControlName="maxParticipants"
                class="form-control"
                placeholder="Leave empty for unlimited"
              >
            </div>

            <div class="modal-actions">
              <button type="button" class="btn btn-outline" (click)="showCreateModal = false">
                Cancel
              </button>
              <button 
                type="submit" 
                class="btn btn-primary"
                [disabled]="createForm.invalid || isCreating"
              >
                @if (isCreating) {
                  <span class="spinner-border spinner-border-sm"></span>
                }
                Create Stream
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
  styles: [`
    .live-manage {
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }

    .page-header h1 {
      font-size: 28px;
      font-weight: 700;
      color: #1a1a2e;
    }

    .btn {
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-success {
      background: #2e7d32;
      color: white;
    }

    .btn-danger {
      background: #dc3545;
      color: white;
    }

    .btn-outline {
      background: transparent;
      border: 2px solid #e1e1e1;
      color: #666;
    }

    .btn-sm {
      padding: 8px 16px;
      font-size: 14px;
    }

    .streams-section {
      margin-bottom: 40px;
    }

    .streams-section h2 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #333;
    }

    .streams-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .stream-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    }

    .stream-card.live {
      border-left: 4px solid #dc3545;
    }

    .stream-card.scheduled {
      border-left: 4px solid #667eea;
    }

    .stream-card.past {
      border-left: 4px solid #ccc;
      opacity: 0.8;
    }

    .stream-badge {
      display: inline-block;
      padding: 4px 12px;
      background: #dc3545;
      color: white;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .stream-badge.scheduled {
      background: #667eea;
    }

    .stream-card h3 {
      font-size: 18px;
      margin-bottom: 8px;
      color: #1a1a2e;
    }

    .stream-card p {
      color: #666;
      font-size: 14px;
      margin-bottom: 16px;
    }

    .stream-actions {
      display: flex;
      gap: 8px;
    }

    .recording-link {
      color: #667eea;
      font-weight: 500;
      text-decoration: none;
    }

    .empty-state,
    .loading-state {
      text-align: center;
      padding: 40px;
      background: #f8f9fa;
      border-radius: 12px;
      color: #666;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e1e1e1;
      border-top-color: #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 16px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 16px;
      width: 100%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      border-bottom: 1px solid #eee;
    }

    .modal-header h2 {
      font-size: 20px;
      margin: 0;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 28px;
      cursor: pointer;
      color: #666;
    }

    form {
      padding: 24px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }

    .form-control {
      width: 100%;
      padding: 12px;
      border: 2px solid #e1e1e1;
      border-radius: 8px;
      font-size: 15px;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
    }

    textarea.form-control {
      resize: vertical;
    }

    .modal-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      padding-top: 16px;
      border-top: 1px solid #eee;
    }
  `]
})
export class TeacherLiveManageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private liveStreamService = inject(LiveStreamService);
  private courseService = inject(CourseService);
  private authService = inject(AuthService);

  activeStreams: LiveStream[] = [];
  scheduledStreams: LiveStream[] = [];
  pastStreams: LiveStream[] = [];
  myCourses: Course[] = [];

  isLoading = true;
  showCreateModal = false;
  isCreating = false;

  createForm: FormGroup;

  constructor() {
    this.createForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      courseId: ['', [Validators.required]],
      scheduledAt: [''],
      maxParticipants: ['']
    });
  }

  ngOnInit(): void {
    this.loadStreams();
    this.loadCourses();
  }

  loadStreams(): void {
    this.isLoading = true;
    this.liveStreamService.getMyLiveStreams().subscribe({
      next: (streams) => {
        this.activeStreams = streams.filter(s => s.status === 'live');
        this.scheduledStreams = streams.filter(s => s.status === 'scheduled');
        this.pastStreams = streams.filter(s => s.status === 'ended');
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadCourses(): void {
    this.courseService.getMyCourses().subscribe({
      next: (courses) => {
        this.myCourses = courses;
      }
    });
  }

  createStream(): void {
    if (this.createForm.invalid) return;

    this.isCreating = true;
    const formValue = this.createForm.value;
    
    const data: CreateLiveStreamRequest = {
      title: formValue.title,
      description: formValue.description,
      course: formValue.courseId
    };

    if (formValue.scheduledAt) {
      data.scheduledStartTime = formValue.scheduledAt;
    }
    if (formValue.maxParticipants) {
      data.maxParticipants = parseInt(formValue.maxParticipants);
    }

    this.liveStreamService.createLiveStream(data).subscribe({
      next: () => {
        this.showCreateModal = false;
        this.createForm.reset();
        this.isCreating = false;
        this.loadStreams();
      },
      error: () => {
        this.isCreating = false;
      }
    });
  }

  startStream(stream: LiveStream): void {
    this.liveStreamService.startLiveStream(stream._id).subscribe({
      next: () => {
        this.loadStreams();
      }
    });
  }

  endStream(stream: LiveStream): void {
    if (confirm('Are you sure you want to end this stream?')) {
      this.liveStreamService.endLiveStream(stream._id).subscribe({
        next: () => {
          this.loadStreams();
        }
      });
    }
  }

  deleteStream(stream: LiveStream): void {
    if (confirm('Are you sure you want to cancel this stream?')) {
      this.liveStreamService.deleteLiveStream(stream._id).subscribe({
        next: () => {
          this.loadStreams();
        }
      });
    }
  }
}
