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


export interface LoginData {
  login: string;
  password: string;
}

export interface RegisterData {
  email: string;
  login: string;
  password: string;
}


