import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { environment } from 'src/environments/environment.prod';
import { StoreModule } from '@ngrx/store';

import { authReducer } from './store/auth.reducers';


@NgModule({
  declarations: [SigninComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    SharedModule,
    StoreModule.forFeature('auth', authReducer),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    AngularFireAuth
  ]
})
export class AuthModule { }
