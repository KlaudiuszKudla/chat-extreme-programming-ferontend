import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  LoginForm,
} from '../models/forms.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {

  initLoginForm(): FormGroup<LoginForm> {
    return new FormGroup({
      login: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(75),
        ],
        nonNullable: true,
      }),
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'Ta kontrolka jest wymagana.';
    }

    if (control.hasError('minlength')) {
      return `Minimalna ilość znaków: ${control.errors?.['minlength']?.requiredLength}.`;
    }

    if (control.hasError('maxlength')) {
      return `Maksymalna ilość znaków: ${control.errors?.['maxlength']?.requiredLength}.`;
    }

    if (control.hasError('email')) {
      return `Niepoprawny adres e-mail.`;
    }

    if (control.hasError('passwordsNotEqual')) {
      return 'Hasła muszą być takie same.';
    }

    return '';
  }
}
