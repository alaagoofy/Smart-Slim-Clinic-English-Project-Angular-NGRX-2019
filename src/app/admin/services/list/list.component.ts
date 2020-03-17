import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as servicesActions from '../../../interface/our-services/store/our-services.actions';
import * as serivesRedusers from '../../../interface/our-services/store/our-services.reducers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  ServicesState: Observable<serivesRedusers.State>;

  constructor(private store: Store<serivesRedusers.FeatureState>) {
  }

  ngOnInit() {
    this.ServicesState = this.store.select('Services');
  }

  // -----------------------------------------------Delete Article
  deleteService(index: number, key: string) {
    this.store.dispatch(new servicesActions.DeleteService({index: index, key: key}));
  }
}
