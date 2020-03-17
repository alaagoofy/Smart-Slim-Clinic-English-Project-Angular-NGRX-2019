import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as appReducers from '../../app.reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  userName: string;

  constructor(private store: Store<appReducers.AppState>) { }

  ngOnInit() {
    this.store.select('auth')
    .subscribe(user => {
      this.userName = user.user.name;
    })
  }

}
