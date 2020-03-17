import { Action } from "@ngrx/store";
import { User } from '../user.interface';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_USER = 'GET_USER';
export const SET_USER = 'SET_USER';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: { user: User, password: string }) { }
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload: { user: User, password: string }) { }
}


export class Signup implements Action {
  readonly type = SIGNUP;
}

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}


export class GetToken implements Action {
  readonly type = GET_TOKEN;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) { }
}



export class GetUser implements Action {
  readonly type = GET_USER;
}

export class SetUser {
  readonly type = SET_USER;

  constructor(public payload: { authenticated: boolean, user: User }) { }
}

export type AuthActions =
  TrySignup |
  TrySignin |
  Signup |
  Signin |
  Logout |
  GetToken |
  SetToken |
  GetUser |
  SetUser;