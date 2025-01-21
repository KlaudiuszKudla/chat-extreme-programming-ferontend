import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FindFriendComponent} from "./find-friend/find-friend.component";
import {FriendListComponent} from "./friend-list/friend-list.component";

const routes: Routes = [
  { path: 'find', component: FindFriendComponent },
  { path: 'friendList', component: FriendListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsRoutingModule {}
