import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExamService } from '../../../../core/services/exam.service';
import { CertificateService } from '../../../../core/services/certificate.service';
import { Exam, ExamAttempt } from '../../../../core/models/exam.model';

@Component({
  selector: 'app-take-exam',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.scss']
})
export class TakeExamComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private examService = inject(ExamService);
  private certificateService = inject(CertificateService);

  exam: Exam | null = null;
  attempt: ExamAttempt | null = null;
  loading = true;
  submitting = false;
  issuingCert = false;

  // Exam state
  currentQuestion = 0;
  answers: Map<number, number> = new Map();
  timeRemaining = 0;
  timer: any = null;

  // Result
  result: ExamAttempt | null = null;

  get totalQuestions(): number {
    return this.exam?.questions?.length || 0;
  }

  get answeredCount(): number {
    return this.answers.size;
  }

  get progress(): number {
    return this.totalQuestions > 0 ? Math.round((this.answeredCount / this.totalQuestions) * 100) : 0;
  }

  get formattedTime(): string {
    const m = Math.floor(this.timeRemaining / 60);
    const s = this.timeRemaining % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadExam(id);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  loadExam(id: string) {
    this.loading = true;
    this.examService.getExamById(id).subscribe({
      next: (exam) => {
        this.exam = exam;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  startExam() {
    if (!this.exam) return;

    this.examService.startExam(this.exam._id).subscribe({
      next: (attempt) => {
        this.attempt = attempt;
        this.timeRemaining = (this.exam?.timeLimit || 30) * 60;
        this.startTimer();
      },
      error: (err) => {
        alert(err.error?.message || 'حدث خطأ');
      }
    });
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.submitExam();
      }
    }, 1000);
  }

  selectAnswer(questionIndex: number, optionIndex: number) {
    this.answers.set(questionIndex, optionIndex);
  }

  isSelected(questionIndex: number, optionIndex: number): boolean {
    return this.answers.get(questionIndex) === optionIndex;
  }

  nextQuestion() {
    if (this.currentQuestion < this.totalQuestions - 1) {
      this.currentQuestion++;
    }
  }

  prevQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }

  goToQuestion(index: number) {
    this.currentQuestion = index;
  }

  submitExam() {
    if (!this.attempt) return;
    if (this.timer) clearInterval(this.timer);

    this.submitting = true;
    const answersArray = Array.from(this.answers.entries()).map(([questionIndex, selectedAnswer]) => ({
      questionIndex,
      selectedAnswer,
    }));

    this.examService.submitExam(this.attempt._id, answersArray).subscribe({
      next: (result) => {
        this.result = result;
        this.submitting = false;
      },
      error: () => {
        this.submitting = false;
      }
    });
  }

  issueCertificate() {
    if (!this.result || !this.exam) return;

    this.issuingCert = true;
    const courseId = typeof this.exam.course === 'object' ? (this.exam.course as any)._id : this.exam.course;

    this.certificateService.issueCertificate(courseId, this.result._id).subscribe({
      next: (cert) => {
        this.issuingCert = false;
        this.router.navigate(['/site/certificate', cert._id]);
      },
      error: (err) => {
        this.issuingCert = false;
        alert(err.error?.message || 'حدث خطأ في إصدار الشهادة');
      }
    });
  }
}
