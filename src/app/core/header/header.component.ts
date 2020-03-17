import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as appStore from '../../app.reducers'
import * as authActions from '../../Auth/store/auth.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store<appStore.AppState>) { }

  ngOnInit() {
  }

  logout(){
    this.store.dispatch(new authActions.Logout())
  }
}
