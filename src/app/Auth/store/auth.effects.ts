import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {map, switchMap, mergeMap, catchError} from 'rxjs/operators';
import {from, of} from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient, HttpRequest} from '@angular/common/http';

import * as authActions from './auth.actions';
import {User} from '../user.interface';

@Injectable()
export class AuthEffects {

  // -----------------USERS API LINK
  url = 'https://smartslimenglishproject.firebaseio.com/users/';

  // -----------------SIGN UP
  @Effect()
  authSignUp = this.actions$
    .pipe(ofType(authActions.TRY_SIGNUP),
      map((action: authActions.TrySignup) => {
        return action.payload;
      }),
      switchMap(user => {
        return firebase.auth().createUserWithEmailAndPassword(user.user.email, user.password).then(() => {
          const req = new HttpRequest('PUT', this.url + firebase.auth().currentUser.uid + '.json',
            user.user /*, { reportProgress: true }*/);
          this.httpClient.request(req).subscribe(res => console.log(res));
        });
      }),
      switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      }),
      mergeMap((token: string) => {
        this.router.navigate(['/']);
        return [
          {type: authActions.SIGNUP},
          {
            type: authActions.SET_TOKEN,
            payload: token
          }
        ];
      }),
      catchError((err) => {
        console.log(err);
        return err;
      })
    );

// -----------------SIGN IN
  @Effect()
  authSignIn = this.actions$
    .pipe(ofType(authActions.TRY_SIGNIN),
      map((action: authActions.TrySignin) => {
        return action.payload;
      }),
      switchMap(user => {

        return firebase.auth().signInWithEmailAndPassword(user.user.email, user.password);
      }),
      switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      }),
      mergeMap((token: string) => {
       //  this.router.navigate(['/']);
        return [
          {type: authActions.SIGNIN},
          {
            type: authActions.SET_TOKEN,
            payload: token
          }
        ];
      }),
      catchError((err) => {
        return err;
      })
    );

  // -----------------LOG OUT
  @Effect({dispatch: false})
  authLogout = this.actions$
    .pipe(ofType(authActions.LOGOUT),
      map(() => {
        this.afAuth.auth.signOut();
        this.router.navigateByUrl('/');
      }));


// -----------------GET AND SET USER
  @Effect()
  authGetUser = this.actions$
    .pipe(ofType(authActions.GET_USER),
      switchMap(() => {
        return this.afAuth.authState;
      }),
      switchMap(getUser => {
        if (getUser) {
          return this.httpClient.get<User>(this.url + getUser.uid + '.json', {
            observe: 'body',
            responseType: 'json'
          });
        } else {
          let user = {role: ''};
          return of(user);
        }
      }),
      map(user => {
        if (user.role !== '') {
            return {
              type: authActions.SET_USER,
              payload: {authenticated: true, user}
            };
        } else {
          return {
            type: authActions.SET_USER,
            payload: {authenticated: false, user: null}
          };
        }
      })
    );

// -----------------GET AND SET TOKEN
  @Effect()
  authGetToken = this.actions$
    .pipe(ofType(authActions.GET_TOKEN),
      switchMap(() => {
        return this.afAuth.authState;
      }),
      switchMap(user => {
        return user.getIdToken();
      }),
      map(token => {
        return {
          type: authActions.SET_TOKEN,
          payload: token
        };
      }),
    );

  constructor(private actions$: Actions,
              private router: Router,
              public afAuth: AngularFireAuth,
              private httpClient: HttpClient) {
  }
}
