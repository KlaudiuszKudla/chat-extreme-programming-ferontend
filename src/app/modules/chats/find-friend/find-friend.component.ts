import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import {ChatUser} from "../../core/models/responseModel";
import {ChatsService} from "../../core/services/chats.service";
import {AppState} from "../../../store/app.reducer";
import {selectUserId} from "../../auth/store/auth.selectors";
import {FriendForm} from "../../core/models/formModel";


@Component({
  selector: 'app-find-friend',
  templateUrl: './find-friend.component.html',
  styleUrls: ['./find-friend.component.scss'],
})
export class FindFriendComponent implements OnInit {
  users: ChatUser[] = [];
  constructor(
    private chatService: ChatsService,
    private store: Store<AppState>,
    private notifierService: NotifierService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.chatService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  addToFriendList(uuid: string) {
    this.store.select(selectUserId).subscribe((userId) => {
      const friendRequest = new FriendForm(userId, uuid);
      this.addFriend(friendRequest, () => {
        this.acceptFriend(friendRequest);
      });
    });
  }

  addFriend(request: FriendForm, callback: () => void) {
    this.chatService.addFriend(request).subscribe((data) => {
      this.notifierService.notify('success', data.message);
      console.log(data);
      callback(); // Wywołaj funkcję zwrotną po zakończeniu addFriend
    });
  }

  acceptFriend(request: FriendForm) {
    this.chatService.acceptFriend(request).subscribe((data) => {
      console.log(data);
    });
  }
}
