import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../core/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotifierService } from 'angular-notifier';
import {PasswordsForm} from "../../../core/models/formModel";

@Component({
  selector: 'app-password-recovery-form',
  templateUrl: './password-recovery-form.component.html',
  styleUrls: ['./password-recovery-form.component.scss'],
})
export class PasswordRecoveryFormComponent implements OnInit {
  passwordsForm: FormGroup<PasswordsForm> =
    this.formService.initPasswordsForm();

  uid = '';
  errorMsg: null | string = null;

  get controls(): PasswordsForm {
    return this.passwordsForm.controls;
  }

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private notifierService: NotifierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.uid = param.get('uid') as string;
      },
    });
  }

  getErrorMessage(control: FormControl<string>): string {
    return this.formService.getErrorMessage(control);
  }

  onPasswdChange() {
    const { password, repeatedPassword } = this.passwordsForm.getRawValue();
    this.auth.changePassword({ password, uid: this.uid }).subscribe({
      next: (response) => {
        this.router.navigate(['/logowanie']);
        this.notifierService.notify(
          'success',
          'Poprawnie wprowadzono hasło, możesz się zalogować'
        );
      },
      error: (err) => {
        this.errorMsg = err;
      },
    });
  }
}
