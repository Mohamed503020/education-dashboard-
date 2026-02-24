import { Component, inject, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LiveStreamService } from '../../../../core/services/live-stream.service';
import { ChatService } from '../../../../core/services/chat.service';
import { AuthService } from '../../../../core/services/auth.service';
import { WebSocketService } from '../../../../core/services/websocket.service';
import { LiveStream, Participant, RaisedHand, ChatMessage } from '../../../../core/models/live-stream.model';

@Component({
  selector: 'app-live-stream-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="live-stream-container" *ngIf="liveStream">
      <div class="stream-main">
        <div class="stream-header">
          <div class="stream-info">
            <span class="live-badge" *ngIf="liveStream.status === 'live'">🔴 LIVE</span>
            <h1>{{ liveStream.title }}</h1>
          </div>
          <div class="stream-actions">
            @if (isTeacher) {
              <button class="btn-action" [class.active]="isCameraOn" (click)="toggleCamera()">
                {{ isCameraOn ? '📹 Camera On' : '📷 Camera Off' }}
              </button>
              <button class="btn-action" [class.active]="isMicOn" (click)="toggleMic()">
                {{ isMicOn ? '🎤 Mic On' : '🔇 Mic Off' }}
              </button>
              <button class="btn-action" (click)="toggleScreenShare()" [class.active]="isScreenSharing">
                🖥️ {{ isScreenSharing ? 'Stop Share' : 'Share Screen' }}
              </button>
            }
            @if (!isTeacher) {
              <button 
                class="btn-action" 
                [class.active]="hasRaisedHand"
                (click)="toggleRaiseHand()"
              >
                ✋ {{ hasRaisedHand ? 'Lower Hand' : 'Raise Hand' }}
              </button>
            }
            <button class="btn-leave" (click)="leaveStream()">
              Leave Stream
            </button>
          </div>
        </div>

        <div class="stream-video">
          <!-- Teacher's own camera preview (local) -->
          <video #localVideo
            [class.hidden]="!isTeacher || !isCameraOn"
            class="video-local"
            autoplay
            playsinline
            muted
          ></video>

          <!-- Remote video (students see teacher's stream) -->
          <video #remoteVideo
            [class.hidden]="isTeacher || !hasRemoteStream"
            class="video-remote"
            autoplay
            playsinline
          ></video>

          <!-- No video fallback -->
          @if ((isTeacher && !isCameraOn && !isScreenSharing) || (!isTeacher && !hasRemoteStream)) {
            <div class="video-placeholder">
              @if (isTeacher) {
                <div class="camera-prompt">
                  <span class="placeholder-icon">📹</span>
                  <p>Click <strong>"Camera On"</strong> to start broadcasting</p>
                  <p class="placeholder-note">Or share your screen to present content</p>
                </div>
              } @else {
                <div class="waiting-prompt">
                  <div class="waiting-spinner"></div>
                  <p>Waiting for teacher to start the stream...</p>
                  <p class="placeholder-note">The video will appear here once the teacher starts broadcasting</p>
                </div>
              }
            </div>
          }

          <!-- Screen share overlay for teacher -->
          <video #screenVideo
            [class.hidden]="!isScreenSharing"
            class="video-screen"
            autoplay
            playsinline
            muted
          ></video>

          <!-- Connection status indicator -->
          @if (connectionState && connectionState !== 'connected') {
            <div class="connection-status" [class]="connectionState">
              {{ connectionState === 'connecting' ? '⏳ Connecting...' : 
                 connectionState === 'disconnected' ? '❌ Disconnected' : 
                 connectionState === 'failed' ? '⚠️ Connection Failed' : '' }}
            </div>
          }
        </div>

        <div class="stream-footer">
          <div class="participants-count">
            👥 {{ participants.length }} watching
          </div>
          <div class="stream-controls-info">
            @if (isTeacher) {
              <span class="status-indicator" [class.active]="isCameraOn">📹</span>
              <span class="status-indicator" [class.active]="isMicOn">🎤</span>
              <span class="status-indicator" [class.active]="isScreenSharing">🖥️</span>
            }
          </div>
          @if (isTeacher && raisedHands.length > 0) {
            <div class="raised-hands-summary">
              ✋ {{ raisedHands.length }} raised hands
            </div>
          }
        </div>
      </div>

      <div class="stream-sidebar">
        <div class="sidebar-tabs">
          <button 
            class="tab-btn" 
            [class.active]="activeTab === 'chat'"
            (click)="activeTab = 'chat'"
          >
            Chat
          </button>
          <button 
            class="tab-btn" 
            [class.active]="activeTab === 'participants'"
            (click)="activeTab = 'participants'"
          >
            Participants
          </button>
          @if (isTeacher) {
            <button 
              class="tab-btn" 
              [class.active]="activeTab === 'hands'"
              (click)="activeTab = 'hands'"
            >
              Hands ({{ raisedHands.length }})
            </button>
          }
        </div>

        <div class="sidebar-content">
          @if (activeTab === 'chat') {
            <div class="chat-section">
              <div class="chat-messages" #chatContainer>
                @for (message of chatMessages; track message._id) {
                  <div class="chat-message" [class.own]="isOwnMessage(message)" [class.system]="message.type !== 'text'">
                    <div class="message-header">
                      <span class="sender-name">{{ getSenderName(message) }}</span>
                      <span class="message-time">{{ message.createdAt | date:'shortTime' }}</span>
                    </div>
                    <p class="message-content">{{ message.content }}</p>
                  </div>
                }
                @if (chatMessages.length === 0) {
                  <div class="empty-chat">
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                }
              </div>
              <div class="chat-input">
                <input 
                  type="text" 
                  [(ngModel)]="newMessage"
                  (keyup.enter)="sendMessage()"
                  placeholder="Type a message..."
                  class="message-input"
                >
                <button class="send-btn" (click)="sendMessage()" [disabled]="!newMessage.trim()">
                  Send
                </button>
              </div>
            </div>
          }

          @if (activeTab === 'participants') {
            <div class="participants-list">
              @for (participant of participants; track participant.user) {
                <div class="participant-item">
                  <div class="participant-avatar">👤</div>
                  <span class="participant-name">{{ getParticipantName(participant) }}</span>
                </div>
              }
              @if (participants.length === 0) {
                <div class="empty-list">
                  <p>No participants yet</p>
                </div>
              }
            </div>
          }

          @if (activeTab === 'hands' && isTeacher) {
            <div class="raised-hands-list">
              @for (hand of raisedHands; track hand.user) {
                <div class="hand-item">
                  <div class="hand-icon">✋</div>
                  <div class="hand-info">
                    <span class="hand-user">{{ hand.user }}</span>
                    <span class="hand-time">{{ hand.raisedAt | date:'shortTime' }}</span>
                  </div>
                  <button class="btn-acknowledge" (click)="acknowledgeHand(hand.user)">
                    Acknowledge
                  </button>
                </div>
              }
              @if (raisedHands.length === 0) {
                <div class="empty-list">
                  <p>No raised hands</p>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>

    @if (isLoading) {
      <div class="loading-overlay">
        <div class="spinner"></div>
        <p>Joining stream...</p>
      </div>
    }
  `,
  styles: [`
    .live-stream-container {
      display: grid;
      grid-template-columns: 1fr 380px;
      height: 100vh;
      background: #1a1a2e;
    }

    .stream-main {
      display: flex;
      flex-direction: column;
      padding: 20px;
    }

    .stream-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .stream-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .live-badge {
      background: #dc3545;
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 700;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    .stream-info h1 {
      color: white;
      font-size: 22px;
      margin: 0;
    }

    .stream-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn-action {
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 13px;
    }

    .btn-action:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .btn-action.active {
      background: #667eea;
      color: white;
    }

    .btn-leave {
      padding: 8px 16px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 13px;
    }

    .stream-video {
      flex: 1;
      background: #000;
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      min-height: 400px;
    }

    .video-local,
    .video-remote,
    .video-screen {
      width: 100%;
      height: 100%;
      object-fit: contain;
      position: absolute;
      top: 0;
      left: 0;
    }

    .video-local {
      transform: scaleX(-1);
    }

    .video-screen {
      z-index: 2;
    }

    .hidden {
      display: none !important;
    }

    .video-placeholder {
      text-align: center;
      color: white;
      z-index: 1;
    }

    .camera-prompt,
    .waiting-prompt {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .placeholder-icon {
      font-size: 72px;
      display: block;
    }

    .placeholder-note {
      font-size: 14px;
      opacity: 0.6;
      margin: 0;
    }

    .waiting-spinner {
      width: 48px;
      height: 48px;
      border: 4px solid rgba(255, 255, 255, 0.1);
      border-top-color: #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .connection-status {
      position: absolute;
      top: 16px;
      left: 16px;
      padding: 8px 16px;
      border-radius: 8px;
      color: white;
      font-size: 13px;
      font-weight: 500;
      z-index: 10;
    }

    .connection-status.connecting {
      background: rgba(255, 193, 7, 0.8);
    }

    .connection-status.disconnected {
      background: rgba(220, 53, 69, 0.8);
    }

    .connection-status.failed {
      background: rgba(220, 53, 69, 0.9);
    }

    .stream-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      color: white;
    }

    .stream-controls-info {
      display: flex;
      gap: 8px;
    }

    .status-indicator {
      font-size: 18px;
      opacity: 0.3;
      transition: opacity 0.2s;
    }

    .status-indicator.active {
      opacity: 1;
    }

    .raised-hands-summary {
      color: #ffc107;
    }

    .stream-sidebar {
      background: #16213e;
      display: flex;
      flex-direction: column;
    }

    .sidebar-tabs {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .tab-btn {
      flex: 1;
      padding: 16px;
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }

    .tab-btn:hover {
      color: white;
    }

    .tab-btn.active {
      color: white;
      border-bottom: 2px solid #667eea;
    }

    .sidebar-content {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .chat-section {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }

    .chat-message {
      margin-bottom: 16px;
    }

    .chat-message.own {
      text-align: right;
    }

    .chat-message.system {
      text-align: center;
      opacity: 0.6;
    }

    .message-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    .chat-message.own .message-header {
      flex-direction: row-reverse;
    }

    .sender-name {
      color: #667eea;
      font-size: 13px;
      font-weight: 500;
    }

    .message-time {
      color: rgba(255, 255, 255, 0.4);
      font-size: 11px;
    }

    .message-content {
      color: white;
      margin: 0;
      line-height: 1.5;
    }

    .empty-chat,
    .empty-list {
      text-align: center;
      padding: 40px 20px;
      color: rgba(255, 255, 255, 0.4);
    }

    .chat-input {
      display: flex;
      gap: 8px;
      padding: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .message-input {
      flex: 1;
      padding: 12px 16px;
      border: none;
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 14px;
    }

    .message-input::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    .message-input:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.15);
    }

    .send-btn {
      padding: 12px 20px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 24px;
      cursor: pointer;
    }

    .send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .participants-list,
    .raised-hands-list {
      padding: 16px;
      overflow-y: auto;
    }

    .participant-item,
    .hand-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 8px;
    }

    .participant-item:hover,
    .hand-item:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .participant-avatar,
    .hand-icon {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }

    .participant-name {
      color: white;
    }

    .hand-info {
      flex: 1;
    }

    .hand-user {
      color: white;
      display: block;
    }

    .hand-time {
      color: rgba(255, 255, 255, 0.4);
      font-size: 12px;
    }

    .btn-acknowledge {
      padding: 6px 12px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }

    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #1a1a2e;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid rgba(255, 255, 255, 0.1);
      border-top-color: #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading-overlay p {
      color: white;
    }

    @media (max-width: 992px) {
      .live-stream-container {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr auto;
      }

      .stream-sidebar {
        height: 50vh;
      }
    }
  `]
})
export class LiveStreamViewerComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private liveStreamService = inject(LiveStreamService);
  private chatService = inject(ChatService);
  private authService = inject(AuthService);
  private wsService = inject(WebSocketService);
  private ngZone = inject(NgZone);

  @ViewChild('localVideo') localVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('screenVideo') screenVideoRef!: ElementRef<HTMLVideoElement>;

  liveStream: LiveStream | null = null;
  participants: Participant[] = [];
  raisedHands: RaisedHand[] = [];
  chatMessages: ChatMessage[] = [];

  isLoading = true;
  isTeacher = false;
  hasRaisedHand = false;
  activeTab = 'chat';
  newMessage = '';

  // WebRTC state
  isCameraOn = false;
  isMicOn = false;
  isScreenSharing = false;
  hasRemoteStream = false;
  connectionState = '';

  localStream: MediaStream | null = null;
  screenStream: MediaStream | null = null;
  peerConnections = new Map<string, RTCPeerConnection>();

  private readonly ICE_SERVERS: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  };

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const streamId = this.route.snapshot.paramMap.get('id');
    if (streamId) {
      this.joinStream(streamId);
    }
  }

  ngOnDestroy(): void {
    this.cleanupWebRTC();
    if (this.liveStream) {
      this.liveStreamService.leaveStream(this.liveStream.roomId);
      this.chatService.disconnectFromChat(this.liveStream._id);
    }
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  joinStream(streamId: string): void {
    this.isLoading = true;

    this.liveStreamService.getLiveStream(streamId).subscribe({
      next: (stream) => {
        this.liveStream = stream;
        this.checkTeacherStatus(stream);
        this.isLoading = false;

        // Connect to live stream WebSocket using roomId
        const streamSub = this.liveStreamService.joinStream(stream.roomId).subscribe({
          next: (event: any) => {
            console.log('Stream event:', event);
          }
        });
        this.subscriptions.push(streamSub);

        // Subscribe to participants and raised hands
        const participantsSub = this.liveStreamService.participants$.subscribe(
          participants => this.participants = participants
        );
        const handsSub = this.liveStreamService.raisedHands$.subscribe(
          hands => {
            this.raisedHands = hands;
            this.checkOwnRaisedHand();
          }
        );
        this.subscriptions.push(participantsSub, handsSub);

        // Connect to chat
        const chatSub = this.chatService.connectToChat(streamId).subscribe();
        const messagesSub = this.chatService.messages$.subscribe(
          messages => this.chatMessages = messages
        );
        this.subscriptions.push(chatSub, messagesSub);

        // Setup WebRTC signaling listeners
        this.setupSignaling();
      },
      error: () => {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  // ==================== WebRTC Signaling ====================

  private setupSignaling(): void {
    // Listen for WebRTC offers (students receive from teacher)
    this.wsService.on('live-stream', 'webrtc-offer', (data: any) => {
      this.ngZone.run(() => {
        console.log('Received WebRTC offer from', data.from);
        this.handleOffer(data);
      });
    });

    // Listen for WebRTC answers (teacher receives from students)
    this.wsService.on('live-stream', 'webrtc-answer', (data: any) => {
      this.ngZone.run(() => {
        console.log('Received WebRTC answer from', data.from);
        this.handleAnswer(data);
      });
    });

    // Listen for ICE candidates
    this.wsService.on('live-stream', 'webrtc-ice-candidate', (data: any) => {
      this.ngZone.run(() => {
        this.handleIceCandidate(data);
      });
    });

    // Listen for camera status updates (students see teacher's camera state)
    this.wsService.on('live-stream', 'camera-status', (data: any) => {
      this.ngZone.run(() => {
        console.log('Camera status update:', data);
      });
    });

    // Listen for new participants joining (teacher sends offer to them)
    this.wsService.on('live-stream', 'userJoined', (data: any) => {
      this.ngZone.run(() => {
        console.log('User joined:', data);
        // If teacher is broadcasting, send offer to new participant
        if (this.isTeacher && this.localStream && data.odId) {
          setTimeout(() => this.createOfferForPeer(data.odId), 1000);
        }
      });
    });
  }

  // ==================== Camera / Mic / Screen ====================

  async toggleCamera(): Promise<void> {
    if (!this.isTeacher) return;

    if (this.isCameraOn) {
      // Turn off camera
      this.stopLocalStream();
      this.isCameraOn = false;
      this.isMicOn = false;
      this.broadcastCameraStatus();
      // Close all peer connections
      this.closeAllPeerConnections();
    } else {
      try {
        this.connectionState = 'connecting';
        this.localStream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: true
        });
        this.isCameraOn = true;
        this.isMicOn = true;

        // Attach to local video element
        setTimeout(() => {
          if (this.localVideoRef?.nativeElement && this.localStream) {
            this.localVideoRef.nativeElement.srcObject = this.localStream;
          }
        }, 100);

        this.connectionState = 'connected';
        this.broadcastCameraStatus();

        // Create offers to all existing participants
        this.createOffersForAllParticipants();
      } catch (err) {
        console.error('Camera access error:', err);
        this.connectionState = 'failed';
        alert('Could not access camera/microphone. Please allow permissions.');
      }
    }
  }

  toggleMic(): void {
    if (!this.localStream) return;
    const audioTracks = this.localStream.getAudioTracks();
    audioTracks.forEach(track => {
      track.enabled = !track.enabled;
    });
    this.isMicOn = !this.isMicOn;
    this.broadcastCameraStatus();
  }

  async toggleScreenShare(): Promise<void> {
    if (!this.isTeacher) return;

    if (this.isScreenSharing) {
      this.stopScreenShare();
    } else {
      try {
        this.screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false
        });
        this.isScreenSharing = true;

        setTimeout(() => {
          if (this.screenVideoRef?.nativeElement && this.screenStream) {
            this.screenVideoRef.nativeElement.srcObject = this.screenStream;
          }
        }, 100);

        // When the user stops sharing via browser UI
        this.screenStream.getVideoTracks()[0].onended = () => {
          this.ngZone.run(() => this.stopScreenShare());
        };

        // Replace video track in all peer connections with screen track
        const screenTrack = this.screenStream.getVideoTracks()[0];
        this.peerConnections.forEach((pc) => {
          const sender = pc.getSenders().find(s => s.track?.kind === 'video');
          if (sender) {
            sender.replaceTrack(screenTrack);
          }
        });
      } catch (err) {
        console.error('Screen share error:', err);
      }
    }
  }

  private stopScreenShare(): void {
    if (this.screenStream) {
      this.screenStream.getTracks().forEach(t => t.stop());
      this.screenStream = null;
    }
    this.isScreenSharing = false;

    // Restore camera track in peer connections
    if (this.localStream) {
      const cameraTrack = this.localStream.getVideoTracks()[0];
      if (cameraTrack) {
        this.peerConnections.forEach((pc) => {
          const sender = pc.getSenders().find(s => s.track?.kind === 'video');
          if (sender) {
            sender.replaceTrack(cameraTrack);
          }
        });
      }
    }
  }

  private stopLocalStream(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach(t => t.stop());
      this.localStream = null;
    }
    if (this.localVideoRef?.nativeElement) {
      this.localVideoRef.nativeElement.srcObject = null;
    }
  }

  private broadcastCameraStatus(): void {
    if (!this.liveStream) return;
    this.wsService.send('live-stream', 'camera-status', {
      roomId: this.liveStream.roomId,
      hasCamera: this.isCameraOn,
      hasAudio: this.isMicOn
    });
  }

  // ==================== WebRTC Peer Connection ====================

  private createOffersForAllParticipants(): void {
    const currentUser = this.authService.getCurrentUser();
    // Create offers for each participant (skip self)
    this.participants.forEach(p => {
      const peerId = p.user;
      if (peerId && peerId !== currentUser?._id) {
        this.createOfferForPeer(peerId);
      }
    });
  }

  private async createOfferForPeer(peerId: string): Promise<void> {
    if (!this.localStream || !this.liveStream) return;

    const pc = this.createPeerConnection(peerId);

    // Add local tracks to the connection
    this.localStream.getTracks().forEach(track => {
      pc.addTrack(track, this.localStream!);
    });

    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      this.wsService.send('live-stream', 'webrtc-offer', {
        roomId: this.liveStream.roomId,
        offer: pc.localDescription
      });
    } catch (err) {
      console.error('Error creating offer for peer', peerId, err);
    }
  }

  private createPeerConnection(peerId: string): RTCPeerConnection {
    // Close existing connection for this peer if any
    if (this.peerConnections.has(peerId)) {
      this.peerConnections.get(peerId)!.close();
    }

    const pc = new RTCPeerConnection(this.ICE_SERVERS);
    this.peerConnections.set(peerId, pc);

    // ICE candidate handler
    pc.onicecandidate = (event) => {
      if (event.candidate && this.liveStream) {
        this.wsService.send('live-stream', 'webrtc-ice-candidate', {
          roomId: this.liveStream.roomId,
          to: peerId,
          candidate: event.candidate
        });
      }
    };

    // Track received (student gets teacher's video)
    pc.ontrack = (event) => {
      this.ngZone.run(() => {
        console.log('Remote track received:', event.track.kind);
        this.hasRemoteStream = true;
        this.connectionState = 'connected';
        if (this.remoteVideoRef?.nativeElement) {
          this.remoteVideoRef.nativeElement.srcObject = event.streams[0];
        }
      });
    };

    // Connection state changes
    pc.onconnectionstatechange = () => {
      this.ngZone.run(() => {
        console.log('Peer connection state:', pc.connectionState);
        switch (pc.connectionState) {
          case 'connecting':
            this.connectionState = 'connecting';
            break;
          case 'connected':
            this.connectionState = 'connected';
            break;
          case 'disconnected':
            this.connectionState = 'disconnected';
            break;
          case 'failed':
            this.connectionState = 'failed';
            break;
          case 'closed':
            this.connectionState = '';
            this.peerConnections.delete(peerId);
            break;
        }
      });
    };

    pc.oniceconnectionstatechange = () => {
      console.log('ICE connection state:', pc.iceConnectionState);
    };

    return pc;
  }

  // ==================== Signaling Handlers ====================

  private async handleOffer(data: any): Promise<void> {
    if (!this.liveStream) return;

    const peerId = data.from;
    this.connectionState = 'connecting';

    const pc = this.createPeerConnection(peerId);

    try {
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      this.wsService.send('live-stream', 'webrtc-answer', {
        roomId: this.liveStream.roomId,
        answer: pc.localDescription,
        to: peerId
      });
    } catch (err) {
      console.error('Error handling offer:', err);
      this.connectionState = 'failed';
    }
  }

  private async handleAnswer(data: any): Promise<void> {
    const peerId = data.from;
    const pc = this.peerConnections.get(peerId);

    if (pc) {
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
      } catch (err) {
        console.error('Error handling answer:', err);
      }
    }
  }

  private async handleIceCandidate(data: any): Promise<void> {
    const peerId = data.from;
    const pc = this.peerConnections.get(peerId);

    if (pc && data.candidate) {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (err) {
        console.error('Error adding ICE candidate:', err);
      }
    }
  }

  // ==================== Cleanup ====================

  private closeAllPeerConnections(): void {
    this.peerConnections.forEach((pc) => pc.close());
    this.peerConnections.clear();
    this.hasRemoteStream = false;
    this.connectionState = '';
  }

  private cleanupWebRTC(): void {
    this.stopLocalStream();
    this.stopScreenShare();
    this.closeAllPeerConnections();
  }

  // ==================== Original Logic ====================

  checkTeacherStatus(stream: LiveStream): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const teacherId = typeof stream.teacher === 'string'
        ? stream.teacher
        : (stream.teacher as any)._id;
      this.isTeacher = currentUser._id === teacherId;
    }
  }

  checkOwnRaisedHand(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.hasRaisedHand = this.raisedHands.some(h => h.user === currentUser._id);
    }
  }

  toggleRaiseHand(): void {
    if (!this.liveStream) return;

    if (this.hasRaisedHand) {
      this.liveStreamService.lowerHand(this.liveStream.roomId);
    } else {
      this.liveStreamService.raiseHand(this.liveStream.roomId);
    }
  }

  acknowledgeHand(userId: string): void {
    if (this.liveStream) {
      this.liveStreamService.acknowledgeHand(this.liveStream.roomId, userId);
    }
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.liveStream) return;

    this.chatService.sendMessage({
      liveStreamId: this.liveStream._id,
      content: this.newMessage.trim()
    });
    this.newMessage = '';
  }

  leaveStream(): void {
    this.cleanupWebRTC();
    if (this.liveStream) {
      this.liveStreamService.leaveStream(this.liveStream.roomId);
      this.chatService.disconnectFromChat(this.liveStream._id);
    }
    this.router.navigate(['/dashboard']);
  }

  isOwnMessage(message: ChatMessage): boolean {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return false;
    const senderId = typeof message.sender === 'string' ? message.sender : message.sender._id;
    return senderId === currentUser._id;
  }

  getSenderName(message: ChatMessage): string {
    if (typeof message.sender === 'string') return 'User';
    return `${message.sender.firstName} ${message.sender.lastName}`;
  }

  getParticipantName(participant: Participant): string {
    return participant.userName || participant.user || 'Unknown';
  }
}
