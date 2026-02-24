import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container" dir="rtl">
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-logo">📚</div>
          <h1>أهلاً بعودتك</h1>
          <p>سجّل دخولك لمتابعة التعلم</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">البريد الإلكتروني</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email"
              class="form-control"
              placeholder="أدخل بريدك الإلكتروني"
              [class.is-invalid]="isFieldInvalid('email')"
            >
            @if (isFieldInvalid('email')) {
              <div class="invalid-feedback">
                @if (loginForm.get('email')?.errors?.['required']) {
                  البريد الإلكتروني مطلوب
                }
                @if (loginForm.get('email')?.errors?.['email']) {
                  أدخل بريد إلكتروني صحيح
                }
              </div>
            }
          </div>

          <div class="form-group">
            <label for="password">كلمة المرور</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password"
              class="form-control"
              placeholder="أدخل كلمة المرور"
              [class.is-invalid]="isFieldInvalid('password')"
            >
            @if (isFieldInvalid('password')) {
              <div class="invalid-feedback">كلمة المرور مطلوبة</div>
            }
          </div>

          @if (errorMessage) {
            <div class="alert alert-danger">{{ errorMessage }}</div>
          }

          <button 
            type="submit" 
            class="btn btn-primary btn-block"
            [disabled]="isLoading"
          >
            @if (isLoading) {
              <span class="spinner"></span>
            }
            تسجيل الدخول
          </button>
        </form>

        <div class="auth-footer">
          <p>ليس لديك حساب؟ <a routerLink="/register">إنشاء حساب جديد</a></p>
        </div>

        <div class="demo-accounts">
          <p>حسابات تجريبية:</p>
          <div class="demo-row">
            <button class="demo-btn student" (click)="fillDemo('student@test.com', 'student123')">🎓 طالب</button>
            <button class="demo-btn teacher" (click)="fillDemo('teacher@test.com', 'teacher123')">👨‍🏫 معلم</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(160deg, #0f4d2a 0%, #1a6b3c 50%, #2e8b57 100%);
      padding: 20px;
      font-family: 'Cairo', 'Tajawal', sans-serif;
    }

    .auth-card {
      background: white;
      border-radius: 24px;
      padding: 44px;
      width: 100%;
      max-width: 440px;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.3);
    }

    .auth-header {
      text-align: center;
      margin-bottom: 36px;
    }

    .auth-logo {
      font-size: 48px;
      margin-bottom: 12px;
    }

    .auth-header h1 {
      font-size: 28px;
      font-weight: 900;
      color: #1a1a2e;
      margin-bottom: 6px;
    }

    .auth-header p {
      color: #6b7280;
      font-size: 15px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 700;
      color: #333;
      font-size: 14px;
    }

    .form-control {
      width: 100%;
      padding: 14px 16px;
      border: 2px solid #e1e1e1;
      border-radius: 12px;
      font-size: 15px;
      font-family: inherit;
      transition: border-color 0.2s, box-shadow 0.2s;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #1a6b3c;
      box-shadow: 0 0 0 3px rgba(26, 107, 60, 0.1);
    }

    .form-control.is-invalid { border-color: #dc3545; }
    .invalid-feedback { color: #dc3545; font-size: 13px; margin-top: 4px; }

    .alert { padding: 12px 16px; border-radius: 10px; margin-bottom: 20px; font-size: 14px; }
    .alert-danger { background: #fff5f5; color: #dc3545; border: 1px solid #ffebee; }

    .btn {
      padding: 14px 24px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 16px;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .btn-primary {
      background: linear-gradient(135deg, #1a6b3c, #2e8b57);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(26, 107, 60, 0.35);
    }

    .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
    .btn-block { width: 100%; }

    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
      margin-left: 8px;
      vertical-align: middle;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .auth-footer {
      text-align: center;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid #f0f0f0;
      p { color: #6b7280; font-size: 14px; }
      a { color: #1a6b3c; text-decoration: none; font-weight: 700; }
      a:hover { text-decoration: underline; }
    }

    .demo-accounts {
      margin-top: 20px;
      text-align: center;
      p { font-size: 13px; color: #9ca3af; margin-bottom: 10px; }
    }

    .demo-row {
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    .demo-btn {
      padding: 8px 20px;
      border-radius: 10px;
      border: 2px solid #e5e7eb;
      background: #fff;
      cursor: pointer;
      font-family: inherit;
      font-weight: 700;
      font-size: 14px;
      transition: all 0.2s;

      &.student { color: #1a6b3c; }
      &.student:hover { border-color: #1a6b3c; background: #e8f5ed; }
      &.teacher { color: #1565c0; }
      &.teacher:hover { border-color: #1565c0; background: #e3f2fd; }
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && control.touched);
  }

  fillDemo(email: string, password: string): void {
    this.loginForm.patchValue({ email, password });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        const role = response.user?.role;
        let targetUrl = '/site';
        if (role === 'teacher' || role === 'admin') {
          targetUrl = '/dashboard';
        }
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || targetUrl;
        this.router.navigate([returnUrl]);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Invalid email or password';
      }
    });
  }
}
