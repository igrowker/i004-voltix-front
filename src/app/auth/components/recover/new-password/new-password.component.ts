import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { InputPasswordComponent } from '../input-password/input-password.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputPasswordComponent],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css',
})
export class NewPasswordComponent {
  newPasswordForm!: FormGroup;
  showSuccessSection: boolean = false;

  fb = inject(FormBuilder);
  router = inject(Router);

  ngOnInit(): void {
    this.buildForm();
  }

  get userEmail() {
    //TODO: cambiar cuando esté el backend
    return 'marcosf3050@gmail.com';
  }

  buildForm() {
    this.newPasswordForm = this.fb.group(
      {
        email: [this.userEmail, [Validators.required, Validators.email]],
        new_password: [
          '',
          [
            Validators.required,
            this.passwordLengthValidator,
            this.uppercaseValidator,
            this.numberValidator,
            this.specialCharacterValidator,
          ],
        ],
        confirm_password: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  get isFormValid() {
    return (
      this.newPasswordForm.valid && !this.newPasswordForm.hasError('mismatch')
    );
  }

  getInputController(property: string) {
    return this.newPasswordForm.get(property) as FormControl;
  }

  // Validación cruzada para las contraseñas
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get('new_password')?.value;
    const repeatPassword = group.get('confirm_password')?.value;
    return newPassword && repeatPassword && newPassword !== repeatPassword
      ? { mismatch: true }
      : null;
  }

  onSubmit() {
    if (this.newPasswordForm.valid) {
      console.log('formulrio enviado correctamente');
      this.showSuccessSection = true;
    } else {
      this.newPasswordForm.markAllAsTouched();
      return;
    }
  }

  //Validadores
  // Validador para la longitud mínima y máxima
  passwordLengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && (value.length < 8 || value.length > 15)) {
      return { lengthError: true };
    }
    return null;
  }

  uppercaseValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const hasUppercase = /[A-Z]/.test(value); // Verificar si contiene al menos una mayúscula

    if (value && !hasUppercase) {
      return { uppercaseError: true }; // Error si no contiene mayúscula
    }

    return null; // Si pasa la validación, no hay error
  }
  // Validador para números
  numberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !/\d/.test(value)) {
      return { numberError: true };
    }
    return null;
  }

  // Validador para caracteres especiales
  specialCharacterValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return { specialCharacterError: true };
    }
    return null;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToForgotPassword(){
    this.router.navigate(['/forgor-password']);

  }
}
