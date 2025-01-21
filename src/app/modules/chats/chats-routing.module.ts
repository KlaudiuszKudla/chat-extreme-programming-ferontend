import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FriendListComponent} from "./friend-list/friend-list.component";

const routes: Routes = [
  { path: 'friendList', component: FriendListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsRoutingModule {}
