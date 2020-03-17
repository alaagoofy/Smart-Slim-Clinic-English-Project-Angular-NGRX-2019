import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ArticlesRoutingModule } from './articles-routing-module';
import { ArticlesComponent } from './articles.component';
import { ArticleCardComponent } from './articles-list/article-card/article-card.component';
import { SharedModule } from '../../shared/shared.module';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ShowArticleComponent } from './show-article/show-article.component';
import { articlesListReducer } from './store/articles.reducers';
import { ArticlesEffects } from './store/articles.effects';
import { CommentsComponent } from './show-article/comments/comments.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LatestListComponent } from './show-article/latest-list/latest-list.component';


@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleCardComponent,
    ArticlesListComponent,
    ShowArticleComponent,
    CommentsComponent,
    LatestListComponent,
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    SharedModule,
    FormsModule,
    StoreModule.forFeature('Articles', articlesListReducer),
    EffectsModule.forFeature([ArticlesEffects]),
    AngularFireDatabaseModule,
  ],
  exports:[
    
  ]
})
export class ArticlesModule { }
