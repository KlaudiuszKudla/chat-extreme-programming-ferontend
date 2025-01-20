import { Component, OnInit } from '@angular/core';
import * as AuthActions from '../app/modules/auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'chat';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
  }
}
