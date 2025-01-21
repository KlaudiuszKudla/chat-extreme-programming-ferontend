import { Component } from '@angular/core';
import { FormService } from '../../../core/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { NotifierService } from 'angular-notifier';
import {PasswdRecoveryForm} from "../../../core/models/responseModel";

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent {
  passwdRecoveryForm: FormGroup<PasswdRecoveryForm> =
    this.formService.initPasswdRecoveryForm();

  errorMsg: null | string = null;

  constructor(
    private formService: FormService,
    private auth: AuthService,
    private notifierService: NotifierService
  ) {}

  getErrorMessage(email: FormControl<string>) {
    return this.formService.getErrorMessage(email);
  }

  onPasswdRecovery() {
    this.auth.resetPassword(this.passwdRecoveryForm.getRawValue()).subscribe({
      next: () => {
        this.notifierService.notify(
          'success',
          'jeśli podano prawidłowego emaila została wysłanan na niego wiadomość'
        );
      },
      error: (err) => {
        this.errorMsg = err;
      },
    });
  }
}
