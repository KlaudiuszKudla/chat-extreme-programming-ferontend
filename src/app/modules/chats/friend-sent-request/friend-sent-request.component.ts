import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import {ChatUser} from "../../core/models/responseModel";
import {ChatsService} from "../../core/services/chats.service";
import {AppState} from "../../../store/app.reducer";
import {selectUserId} from "../../auth/store/auth.selectors";

@Component({
  selector: 'app-friend-sent-request',
  templateUrl: './friend-sent-request.component.html',
  styleUrls: ['./friend-sent-request.component.scss'],
})
export class FriendSentRequestComponent implements OnInit {
  friends: ChatUser[] = [];
  constructor(
    private chatService: ChatsService,
    private store: Store<AppState>,
    private notifierService: NotifierService,
  ) {}
  ngOnInit(): void {
    this.getFriendSentRequest();
  }

  getFriendSentRequest() {
    this.store.select(selectUserId).subscribe((id) => {
      if (id) {
        this.chatService.getFriendSentRequest(id).subscribe((data) => {
          this.friends = data;
        });
      }
    });
  }
}
