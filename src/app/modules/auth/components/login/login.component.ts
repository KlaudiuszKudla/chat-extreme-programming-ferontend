import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as AuthActions from '../../store/auth.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthError, selectAuthLoading } from '../../store/auth.selectors';
import {FormService} from "../../../core/services/form.service";
import {AppState} from "../../../../store/app.reducer";
import {LoginForm} from "../../../core/models/formModel";

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup<LoginForm>;

  errorMsg$: Observable<string | null>;
  loading$: Observable<boolean>;

  get controls() {
    return this.loginForm.controls;
  }

  constructor(
    private formSerivce: FormService,
    private store: Store<AppState>
  ) {
    this.errorMsg$ = this.store.select(selectAuthError);
    this.loading$ = this.store.select(selectAuthLoading);
    this.loginForm = this.formSerivce.initLoginForm();
  }

  getErrorMessage(control: FormControl) {
    return this.formSerivce.getErrorMessage(control);
  }

  onLogin() {
    this.store.dispatch(
      AuthActions.login({ loginData: this.loginForm.getRawValue() })
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.clearError());
  }
}
