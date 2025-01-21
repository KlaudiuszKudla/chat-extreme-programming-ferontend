import { Form, FormControl } from '@angular/forms';

export interface PasswdRecoveryForm {
  email: FormControl<string>;
}

export interface PasswordsForm {
  password: FormControl<string>;
  repeatedPassword: FormControl<string>;
}

export interface LoginForm {
  login: FormControl<string>;
  password: FormControl<string>;
}

export interface RegisterForm extends LoginForm {
  email: FormControl<string>;
  repeatedPassword: FormControl<string>;
}

export interface ChangeUserDataForm {
  login: FormControl<string | null>;
  password: FormControl<string | null>;
}
export class FriendForm {
  constructor(
    public userId: string | undefined,
    public friendId: string,
  ) {}
}
