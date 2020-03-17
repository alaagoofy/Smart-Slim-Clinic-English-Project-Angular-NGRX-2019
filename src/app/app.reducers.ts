import { ActionReducerMap } from '@ngrx/store';

import * as fromServices from './interface/our-services/store/our-services.reducers';
import * as fromArticles from './interface/articles/store/articles.reducers';
import * as fromAuth from './auth/store/auth.reducers';

export interface AppState {
  Services: fromServices.State,
  Articles: fromArticles.State,
  auth: fromAuth.State
}
export const reducers: ActionReducerMap<AppState> = {
  Services: fromServices.ServicesListReducer,
  Articles: fromArticles.articlesListReducer,
  auth: fromAuth.authReducer
};
