import { FormControl } from '@angular/forms';


export interface LoginForm {
  login: FormControl<string>;
  password: FormControl<string>;
}

export interface RegisterForm extends LoginForm {
  email: FormControl<string>;
  repeatedPassword: FormControl<string>;
}

export interface PasswdRecoveryForm {
  email: FormControl<string>;
}
export interface PasswordsForm {
  password: FormControl<string>;
  repeatedPassword: FormControl<string>;
}

export interface ChangePasswordData {
  password: string;
  uid: string;
}

export interface ResetPasswordData {
  email: string;
}


export interface ResponseModel {
  timestamp: string;
  message: string;
  code: string;
}
