import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Article } from '../article.model';
import * as ArticlsRed from '../store/articles.reducers'

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html'
})
export class ShowArticleComponent implements OnInit, OnDestroy {

  Article: Article
  id: string;
  pageLoad = false;
  subScription: Subscription;

  constructor(private route: ActivatedRoute,
    private store: Store<ArticlsRed.FeatureState>, private router: Router) { }

  ngOnInit() {
    this.subScription = this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.subScription = this.store.select('Articles')
          .subscribe(res => {
            if (res.Articles.length !== 0) {
              this.Article = res.Articles.find(article => article['key'] == this.id);
              if (!this.Article) {
                this.router.navigateByUrl('/');
              }
              this.pageLoad = true;
            }
          })
      })
  }

  ngOnDestroy() {
    this.subScription.unsubscribe();
  }
}
