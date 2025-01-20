import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CoreModule} from "./modules/core/core.module";
import { EffectsModule } from '@ngrx/effects';
import {AuthEffects} from "./modules/auth/store/auth.effects";
import {authReducer} from "./modules/auth/store/auth.reducer";
import {NotifierOptions} from "angular-notifier";
import {AuthModule} from "./modules/auth/auth.module";

const customNotifier: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
};

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AuthModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
      StoreModule.forRoot({ auth: authReducer }),
      EffectsModule.forRoot([AuthEffects]),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
