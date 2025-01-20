import { AppState } from '../../../store/app.reducer';
import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuth = (state: AppState) => state.auth;

export const selectAuthLoading = createSelector(
  selectAuth,
  (state: AuthState) => state.loading,
);
export const selectAuthError = createSelector(
  selectAuth,
  (state: AuthState) => state.error,
);
