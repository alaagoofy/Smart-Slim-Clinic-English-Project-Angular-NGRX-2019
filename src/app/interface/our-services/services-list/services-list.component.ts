import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import * as ServicesRed from '../store/our-services.reducers';

@Component({
  selector: 'app-articles-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {

  ServicesState: Observable<ServicesRed.State>;

  constructor(private store: Store<ServicesRed.FeatureState>) {
  }

  ngOnInit() {
    //-----get Articles from store
    this.ServicesState = this.store.select('Services');
  }

}
