import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as articleActions from '../../../interface/articles/store/articles.actions';
import * as articlered from '../../../interface/articles/store/articles.reducers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  ArticlesState: Observable<articlered.State>;

  constructor(private store: Store<articlered.FeatureState>) {
  }

  ngOnInit() {
    this.ArticlesState = this.store.select('Articles');
  }

  // -----------------------------------------------Delete Article
  deleteArticle(index: number, key: string) {
    this.store.dispatch(new articleActions.DeleteArticle({index: index, key: key}));
  }
}
