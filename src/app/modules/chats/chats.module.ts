import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatsRoutingModule} from "./chats-routing.module";
import {FriendListComponent} from "./friend-list/friend-list.component";



@NgModule({
  declarations: [FriendListComponent],
  imports: [
    CommonModule,ChatsRoutingModule
  ]
})
export class ChatsModule { }
