import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatsRoutingModule} from "./chats-routing.module";
import {FriendListComponent} from "./friend-list/friend-list.component";
import {FindFriendComponent} from "./find-friend/find-friend.component";



@NgModule({
  declarations: [FriendListComponent,FindFriendComponent],
  imports: [
    CommonModule,ChatsRoutingModule,
  ]
})
export class ChatsModule { }
