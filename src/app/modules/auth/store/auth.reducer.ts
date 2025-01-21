
import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import {User} from "../../core/models/responseModel";

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const _authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    loading: false,
    user: new User(
      action.user.id,
      action.user.login,
      action.user.email,
      action.user.role,
    ),
    error: null,
  })),
  on(AuthActions.register, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.registerSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(AuthActions.registerFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(AuthActions.loginFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
