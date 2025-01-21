import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ResponseModel,
  ChangePasswordData,
  ResetPasswordData, LoggedInResponse, RegisterData, LoginData, IUser,
} from '../models/responseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) {}

  login(body: LoginData): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/login`, body, {
      withCredentials: true,
    });
  }

  logout(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.apiUrl}/logout`, {
      withCredentials: true,
    });
  }
  isLoggedIn(): Observable<LoggedInResponse> {
    return this.http.get<LoggedInResponse>(`${this.apiUrl}/logged-in`, {
      withCredentials: true,
    });
  }

  autoLogin(): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/auto-login`, {
      withCredentials: true,
    });
  }

  register(body: RegisterData): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.apiUrl}/register`, body);
  }

  activateAccount(uid: string): Observable<ResponseModel> {
    const params = new HttpParams().append('uid', uid);

    return this.http.get<ResponseModel>(`${this.apiUrl}/activate`, {
      params,
    });
  }

  resetPassword(body: ResetPasswordData): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.apiUrl}/reset-password`, body);
  }

  changePassword(body: ChangePasswordData): Observable<ResponseModel> {
    return this.http.patch<ResponseModel>(
      `${this.apiUrl}/reset-password`,
      body,
      {
        withCredentials: true,
      },
    );
  }
}
