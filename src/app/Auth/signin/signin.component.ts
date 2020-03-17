import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';

import * as appReducers from '../../app.reducers';
import * as authActions from '../store/auth.actions';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<appReducers.AppState>, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  login(loginForm) {
    this.store.dispatch(new authActions.TrySignin({user: loginForm, password: loginForm.password}));
    let returnURL = this.route.snapshot.queryParamMap.get('returnURL');
    if (returnURL) {
      this.router.navigateByUrl(returnURL);
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
