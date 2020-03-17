import * as authActions from './auth.actions';
import * as fromApp from '../../app.reducers';
import {User} from '../user.interface';


export interface FeatureState extends fromApp.AppState {
  items: State,
}

export interface State {
  token: string;
  authenticated: boolean;
  user: User
}

const initialState: State = {
  token: null,
  authenticated: false,
  user: {
    avatar: '',
    name: '',
    phone: '',
    email: '',
    country: '',
    city: '',
    address: '',
    gender: '',
    role: '',
  },
};

export function authReducer(state = initialState, action: authActions.AuthActions) {
  switch (action.type) {
    case authActions.SIGNIN:
    case authActions.SIGNUP:
      return {
        ...state,
      };
    case authActions.LOGOUT:
      return {
        ...state,
        token: null,
        authenticated: false
      };
    case authActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case authActions.SET_USER:
      return {
        ...state,
        authenticated: action.payload.authenticated,
        user: action.payload.user
      };
    default:
      return state;
  }
}
