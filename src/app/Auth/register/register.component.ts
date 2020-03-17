import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromApp from '../../app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {

  }

  register(registerForm) {
// console.log(registerForm.email)
    const newUser = {
      avatar: '',
      name: registerForm.name,
      phone: registerForm.phone,
      email: registerForm.email,
      gender: registerForm.gender,
      country: registerForm.country,
      city: registerForm.city,
      address: registerForm.address,
      role: 'user',
    };
    this.store.dispatch(new AuthActions.TrySignup({user: newUser, password: registerForm.password}));
  }
}
