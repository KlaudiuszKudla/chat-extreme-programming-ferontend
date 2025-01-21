import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatUser } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  apiUrl = `${environment.apiUrl}`;
  friendUrl = `${environment.apiUrl}/friend`;

  constructor(private http: HttpClient) {}
  getFriends(id: string): Observable<ChatUser[]> {
    const params = new HttpParams().append('userId', id);
    return this.http.get<ChatUser[]>(`${this.friendUrl}`, {
      params,
      withCredentials: true,
    });
  }
}
