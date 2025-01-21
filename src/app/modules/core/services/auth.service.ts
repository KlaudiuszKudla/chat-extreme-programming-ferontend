import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  IUser,
  LoginData, RegisterData,
} from '../models/formModel';
import { Observable } from 'rxjs';
import {ResponseModel} from "../models/responseModel";

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

  register(body: RegisterData): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.apiUrl}/register`, body);
  }

  activateAccount(uid: string): Observable<ResponseModel> {
    const params = new HttpParams().append('uid', uid);

    return this.http.get<ResponseModel>(`${this.apiUrl}/activate`, {
      params,
    });
  }
}
