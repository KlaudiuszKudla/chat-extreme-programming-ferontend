import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FindFriendComponent} from "./find-friend/find-friend.component";
import {FriendListComponent} from "./friend-list/friend-list.component";
import {FriendSentRequestComponent} from "./friend-sent-request/friend-sent-request.component";
import {FriendRequestComponent} from "./friend-request/friend-request.component";

const routes: Routes = [
  { path: 'find', component: FindFriendComponent },
  { path: 'friendList', component: FriendListComponent },
  { path: 'friendRequest', component: FriendRequestComponent },
  { path: 'friendSentRequest', component: FriendSentRequestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsRoutingModule {}
