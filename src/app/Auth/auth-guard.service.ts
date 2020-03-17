import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromAuth.FeatureState>, private router: Router) { }

  canActivate(router, state: RouterStateSnapshot) {
    return this.store.select('auth')
      .pipe(
        map((authState: fromAuth.State) => {
         if(authState.user) {
          if (authState.user.role === 'admin') {
            return true;
          } else {
            if (authState.user.role !== '') {
              this.router.navigate(['/'], { queryParams: { returnURL: state.url } });
            } else {
              this.router.navigate(['/signin'], { queryParams: { returnURL: state.url } });
            }
            return false;
          }
         }
         else {
          this.router.navigate(['/signin'], { queryParams: { returnURL: state.url } });
          return false;
         }

        }));
  }
}
