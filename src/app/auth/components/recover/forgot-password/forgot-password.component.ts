import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RecoverService } from '../service/recover.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  showSuccessSection: boolean = false;

  fb = inject(FormBuilder);
  router = inject(Router);
  recoverService = inject(RecoverService);

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.get('email')?.value;
 
      this.recoverService.resetPassword({ email }).subscribe({
        next: (response) => {
          console.log('Correo enviado exitosamente:', response);
          this.showSuccessSection = true;
        },
        error: (err) => {
          console.error('Error al enviar correo de restablecimiento:', err);
        },
      });
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }


  get isFormValid() {
    return this.resetPasswordForm.valid;
  }

  get email() {
    return this.resetPasswordForm.get('email');
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }
}
