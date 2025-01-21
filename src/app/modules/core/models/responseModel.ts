export interface IUser {
  id: string;
  login: string;
  email: string;
  role: string;
}

export class User implements IUser {
  constructor(
    public id: string,
    public login: string,
    public email: string,
    public role: string,
  ) {}
}

export interface ChatUser {
  email: string;
  login: string;
  id: string;
  imageUrl: string;
}

export interface LoginData {
  login: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
}

export interface ChangePasswordData {
  password: string;
  uid: string;
}

export interface RegisterData {
  email: string;
  login: string;
  password: string;
}

export interface ChangeUserData {
  login: string | null;
  password: string | null;
  id: string | null;
  imageUrl: string | null;
}

export interface ResponseModel {
  timestamp: string;
  message: string;
  code: string;
}

export interface LoggedInResponse extends Omit<ResponseModel, 'message'> {
  message: boolean;
}
