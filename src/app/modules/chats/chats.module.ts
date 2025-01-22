import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatsRoutingModule} from "./chats-routing.module";
import {FriendListComponent} from "./friend-list/friend-list.component";
import {FindFriendComponent} from "./find-friend/find-friend.component";
import {FriendRequestComponent} from "./friend-request/friend-request.component";
import {FriendSentRequestComponent} from "./friend-sent-request/friend-sent-request.component";
import {ChatsComponent} from "./chats/chats.component";



@NgModule({
  declarations: [FriendListComponent,FindFriendComponent,FriendRequestComponent, FriendSentRequestComponent, ChatsComponent],
  imports: [
    CommonModule,ChatsRoutingModule,
  ]
})
export class ChatsModule { }
