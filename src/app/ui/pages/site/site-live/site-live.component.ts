import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LiveStreamService } from '../../../../core/services/live-stream.service';

@Component({
  selector: 'app-site-live',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="live-page" dir="rtl">
      <!-- Hero -->
      <section class="live-hero">
        <div class="container">
          <div class="hero-badge">🎥 البث المباشر</div>
          <h1>حصص مباشرة مع أفضل المعلمين</h1>
          <p>تابع الحصص الحية وتفاعل مباشرة مع معلمك، اطرح الأسئلة واحصل على إجابات فورية</p>
        </div>
      </section>

      <!-- Active Streams -->
      <section class="streams-section">
        <div class="container">
          @if (loading) {
            <div class="loading-state">
              <div class="spinner"></div>
              <p>جاري تحميل البث المباشر...</p>
            </div>
          } @else if (streams.length > 0) {
            <div class="section-title">
              <span class="live-dot"></span>
              <h2>بث مباشر الآن ({{ streams.length }})</h2>
            </div>
            <div class="streams-grid">
              @for (stream of streams; track stream._id) {
                <div class="stream-card">
                  <div class="stream-thumb">
                    <div class="thumb-overlay">
                      <span class="live-tag"><span class="pulse-dot"></span> مباشر</span>
                    </div>
                    <div class="thumb-bg">🎥</div>
                  </div>
                  <div class="stream-body">
                    <h3>{{ stream.title }}</h3>
                    <p class="stream-desc">{{ stream.description || 'حصة مباشرة - انضم الآن' }}</p>
                    <div class="stream-meta">
                      <span>👨‍🏫 {{ stream.teacher?.firstName || 'المعلم' }}</span>
                      <span>👥 {{ stream.participants?.length || 0 }} مشاهد</span>
                    </div>
                    <a [routerLink]="['/site/live', stream._id]" class="btn-join">
                      انضم للبث <span class="arrow">←</span>
                    </a>
                  </div>
                </div>
              }
            </div>
          } @else {
            <div class="empty-state">
              <div class="empty-icon">📡</div>
              <h2>لا يوجد بث مباشر حالياً</h2>
              <p>لا توجد حصص مباشرة الآن. تابعنا لمعرفة مواعيد البث القادمة</p>
              <a routerLink="/site" class="btn-back">العودة للرئيسية</a>
            </div>
          }
        </div>
      </section>

      <!-- Info Section -->
      <section class="info-section">
        <div class="container">
          <div class="info-grid">
            <div class="info-card">
              <span class="info-icon">📺</span>
              <h3>بث عالي الجودة</h3>
              <p>استمتع ببث فيديو واضح ونقي بدون تقطيع</p>
            </div>
            <div class="info-card">
              <span class="info-icon">💬</span>
              <h3>محادثة مباشرة</h3>
              <p>تفاعل مع المعلم والطلاب عبر الدردشة الفورية</p>
            </div>
            <div class="info-card">
              <span class="info-icon">✋</span>
              <h3>رفع اليد</h3>
              <p>اطلب الإذن للتحدث وطرح أسئلتك مباشرة</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .live-page { font-family: 'Cairo', 'Tajawal', sans-serif; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

    .live-hero {
      background: linear-gradient(135deg, #b71c1c, #e53935);
      color: #fff;
      padding: 80px 0;
      text-align: center;
      .hero-badge {
        display: inline-block;
        background: rgba(255,255,255,0.15);
        padding: 8px 24px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 20px;
      }
      h1 { font-size: 40px; font-weight: 900; margin-bottom: 14px; }
      p { font-size: 17px; opacity: 0.9; max-width: 550px; margin: 0 auto; line-height: 1.7; }
    }

    .streams-section { padding: 60px 0; }

    .section-title {
      display: flex; align-items: center; gap: 12px; margin-bottom: 30px;
      .live-dot {
        width: 12px; height: 12px; border-radius: 50%; background: #e53935;
        animation: blink 1s ease-in-out infinite;
      }
      h2 { font-size: 24px; font-weight: 800; color: #1a1a2e; }
    }

    .streams-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 28px; }

    .stream-card {
      background: #fff; border-radius: 20px; overflow: hidden;
      box-shadow: 0 4px 24px rgba(0,0,0,0.07); transition: all 0.3s;
      border: 2px solid transparent;
      &:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); border-color: #e53935; }
    }

    .stream-thumb {
      height: 180px; position: relative; background: linear-gradient(135deg, #b71c1c, #e53935);
      display: flex; align-items: center; justify-content: center;
      .thumb-bg { font-size: 60px; opacity: 0.3; }
      .thumb-overlay { position: absolute; top: 14px; right: 14px; z-index: 2; }
    }

    .live-tag {
      display: inline-flex; align-items: center; gap: 6px;
      background: #e53935; color: #fff; padding: 6px 16px;
      border-radius: 8px; font-size: 13px; font-weight: 700;
      .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #fff; animation: blink 1s ease-in-out infinite; }
    }

    .stream-body {
      padding: 22px;
      h3 { font-size: 18px; font-weight: 800; margin-bottom: 8px; color: #1a1a2e; }
      .stream-desc { font-size: 14px; color: #6b7280; margin-bottom: 14px; line-height: 1.6; }
    }

    .stream-meta {
      display: flex; gap: 18px; margin-bottom: 16px; font-size: 13px; color: #6b7280;
    }

    .btn-join {
      display: inline-flex; align-items: center; gap: 8px;
      background: #e53935; color: #fff; padding: 12px 28px;
      border-radius: 12px; font-weight: 800; font-size: 15px;
      text-decoration: none; transition: all 0.3s;
      &:hover { background: #b71c1c; transform: scale(1.03); }
      .arrow { font-size: 18px; }
    }

    .empty-state {
      text-align: center; padding: 80px 20px;
      .empty-icon { font-size: 72px; margin-bottom: 20px; }
      h2 { font-size: 26px; font-weight: 800; color: #1a1a2e; margin-bottom: 12px; }
      p { color: #6b7280; font-size: 16px; margin-bottom: 28px; }
    }

    .btn-back {
      display: inline-block; padding: 14px 36px;
      background: #e8f5ed; color: #1a6b3c; border-radius: 14px;
      font-weight: 800; font-size: 16px; text-decoration: none;
      transition: all 0.3s;
      &:hover { background: #1a6b3c; color: #fff; }
    }

    .loading-state {
      text-align: center; padding: 60px;
      .spinner {
        width: 40px; height: 40px; border: 4px solid #f0f0f0;
        border-top-color: #e53935; border-radius: 50%;
        animation: spin 0.8s linear infinite; margin: 0 auto 16px;
      }
      p { color: #6b7280; }
    }

    .info-section { padding: 60px 0 80px; background: #f8faf9; }
    .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

    .info-card {
      text-align: center; padding: 36px 24px; background: #fff;
      border-radius: 20px; box-shadow: 0 2px 12px rgba(0,0,0,0.04);
      transition: all 0.3s;
      &:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
      .info-icon { font-size: 40px; display: block; margin-bottom: 14px; }
      h3 { font-size: 18px; font-weight: 800; color: #1a1a2e; margin-bottom: 10px; }
      p { font-size: 14px; color: #6b7280; line-height: 1.7; }
    }

    @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 768px) {
      .live-hero h1 { font-size: 28px; }
      .streams-grid { grid-template-columns: 1fr; }
      .info-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class SiteLiveComponent implements OnInit {
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
