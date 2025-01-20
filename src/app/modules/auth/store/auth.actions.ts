import { createAction, props } from '@ngrx/store';
import {
  IUser,
  LoginData,
} from '../../core/models/responseModel';

const LOGIN_TYPE = '[Auth] Login';
const LOGIN_SUCCESS_TYPE = '[Auth] Login Success';
const LOGIN_FAILURE_TYPE = '[Auth] Login Failure';
const CLEAR_ERROR_TYPE = '[Auth] Clear Error';


export const login = createAction(
  LOGIN_TYPE,
  props<{ loginData: LoginData }>(),
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS_TYPE,
  props<{ user: IUser }>(),
);

export const loginFailure = createAction(
  LOGIN_FAILURE_TYPE,
  props<{ error: string }>(),
);

export const clearError = createAction(CLEAR_ERROR_TYPE);

