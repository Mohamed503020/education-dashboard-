import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CertificateService } from '../../../../core/services/certificate.service';
import { Certificate } from '../../../../core/models/certificate.model';

@Component({
  selector: 'app-certificate-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './certificate-view.component.html',
  styleUrls: ['./certificate-view.component.scss']
})
export class CertificateViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private certificateService = inject(CertificateService);

  certificate: Certificate | null = null;
  loading = true;

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadCertificate(id);
  }

  loadCertificate(id: string) {
    this.loading = true;
    this.certificateService.getCertificateById(id).subscribe({
      next: (cert) => {
        this.certificate = cert;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  printCertificate() {
    window.print();
  }

  getFormattedDate(date: string): string {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
