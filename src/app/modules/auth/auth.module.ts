import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import {RegisterComponent} from "./components/register/register.component";
import {AccountActivationComponent} from "./components/account-activation/account-activation.component";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AccountActivationComponent
  ],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
