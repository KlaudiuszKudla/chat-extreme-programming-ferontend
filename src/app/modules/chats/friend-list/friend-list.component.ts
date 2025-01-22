import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import {AppState} from "../../../store/app.reducer";
import {ChatUser} from "../../core/models/responseModel";
import {ChatsService} from "../../core/services/chats.service";
import {selectUserId, selectUserLogin} from "../../auth/store/auth.selectors";
import {FriendForm} from "../../core/models/formModel";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent implements OnInit {
  id$!: string;
  login$!: string;
  friends: ChatUser[] = [];
  constructor(
    private store: Store<AppState>,
    private chatService: ChatsService,
    private notifierService: NotifierService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getUserLogin();
    this.store.select(selectUserId).subscribe({
      next: (id) => {
        if (id) {
          this.id$ = id;
          console.log(id);
          this.getFriends(id);
        }
      },
    });
  }

  getUserLogin() {
    this.store.select(selectUserLogin).subscribe((login) => {
      if (login) this.login$ = login;
    });
  }

  getFriends(uuid: string) {
    this.chatService.getFriends(uuid).subscribe((data) => {
      this.friends = data;
    });
  }

  deleteFromFriendList(uuid: string) {
    const friendForm = new FriendForm(this.id$, uuid);
    this.chatService.deleteFriend(friendForm).subscribe((data) => {
      if (data) {
        this.notifierService.notify('success', data.message);
        this.getFriends(this.id$);
      }
    });
  }

  blockFriend(uuid: string) {
    const friendForm = new FriendForm(this.id$, uuid);
    this.chatService.blockFriend(friendForm).subscribe((data) => {
      if (data) {
        this.notifierService.notify('success', data.message);
        this.getFriends(this.id$);
      }
    });
  }

}
