import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as AppRed from '../../../../app.reducers';
import { Article } from 'src/app/interface/articles/article.model';

@Component({
  selector: 'app-latest-list',
  templateUrl: './latest-list.component.html'
})
export class LatestListComponent implements OnInit,OnDestroy {

  randomArticles: Article[] =[];
  subScrib: Subscription;

  constructor(private store: Store<AppRed.AppState>) { }

  ngOnInit() {
    this.subScrib = this.store.select('Articles')
    .subscribe((articles) => {
      if (articles.Articles.length != 0) {
        this.randomArticles = this.getRandom(articles.Articles, 3);
      }
    });
  }

  
  // ------------------------Get Random rows from array
  getRandom(arr, no) {
    let result = new Array(no),
      len = arr.length,
      taken = new Array(len);
    if (no > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (no--) {
      let x = Math.floor(Math.random() * len);
      result[no] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  ngOnDestroy() {
    this.subScrib.unsubscribe();
  }
}
