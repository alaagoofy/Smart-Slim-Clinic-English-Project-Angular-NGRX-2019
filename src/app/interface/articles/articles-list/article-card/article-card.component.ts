import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Article } from '../../article.model';
import * as ArticlesRed from '../../store/articles.reducers'


@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {
  @Input() Article: Article;
  @Input() index: number;

  constructor(private store: Store<ArticlesRed.FeatureState>) { }

  ngOnInit() {
   // console.log(this.Article.imageURL);

//this.store.select('Articles').subscribe(res => console.log(res))
  }

}
