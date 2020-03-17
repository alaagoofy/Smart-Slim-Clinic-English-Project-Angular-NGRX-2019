import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import * as articlered from '../store/articles.reducers';
import * as AppRed from '../../../app.reducers';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  ArticlesState: Observable<articlered.State>;

  constructor(private store: Store<articlered.FeatureState>) {
  }

  ngOnInit() {
    //-----get Articles from store
    this.ArticlesState = this.store.select('Articles');
  }

}
