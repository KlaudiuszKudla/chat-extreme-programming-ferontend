import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ChatUser, ResponseModel} from '../models/responseModel';
import {FriendForm} from "../models/formModel";

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

  getUsers(): Observable<ChatUser[]> {
    return this.http.get<ChatUser[]>(`${this.apiUrl}/user`, {
      withCredentials: true,
    });
  }

  addFriend(friendForm: FriendForm): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.friendUrl}`, friendForm, {
      withCredentials: true,
    });
  }

  acceptFriend(friendForm: FriendForm): Observable<ResponseModel> {
    return this.http.patch<ResponseModel>(
      `${this.friendUrl}/acceptFriend`,
      friendForm,
      {
        withCredentials: true,
      },
    );
  }
}
