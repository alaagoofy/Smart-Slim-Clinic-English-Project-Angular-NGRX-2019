import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';

import * as ArticlesActions from './articles.actions';
import {Article} from '../article.model';

@Injectable()
export class ArticlesEffects {

  url = 'https://smartslimenglishproject.firebaseio.com/articles.json/';

// ------------------------Get and Set Articles From DB
  @Effect()
  GetArticles = this.actions$
    .pipe(ofType(ArticlesActions.GET_ARTICLES),
      switchMap(() => {
        return this.httpClient.get<Article[]>(this.url, {
          observe: 'body',
          responseType: 'json'
        });
      }), map(
        (articles) => {
          if (articles) {
            const mappedArticles = Object.keys(articles).map(key => ({key, ...articles[key]}));
            return {
              type: ArticlesActions.SET_ARTICLES,
              payload: mappedArticles
            };
          } else {
            return {
              type: ArticlesActions.SET_ARTICLES,
              payload: []
            };
          }

        }
      )
    );

  // ---------------------------------------------Add New Article
  @Effect({dispatch: false})
  NewArticle = this.actions$
    .pipe(ofType(ArticlesActions.ADD_ARTICLE),
      switchMap((article) => {
        let Article = article['payload'];
        const req = new HttpRequest('POST', this.url, Article/*, { reportProgress: true }*/);
        return this.httpClient.request(req);
      }),

    );

  // ------------------------------------------------------Edit Article
  @Effect({dispatch: false})
  UpdateArticle = this.actions$
    .pipe(ofType(ArticlesActions.EDIT_ARTICLE),
      switchMap((article) => {
        let Article = article['payload'];
        let finalArticle = Article['value'];
        let getID = Article['key'];
        const req = new HttpRequest('PUT',
          'https://smartslimenglishproject.firebaseio.com/articles/' + getID + '.json',
          finalArticle, {reportProgress: true});
        return this.httpClient.request(req);
      }),
    );

// ----------------------------------------------------Delete Article
  @Effect({dispatch: false})
  DeleteArticle = this.actions$
    .pipe(ofType(ArticlesActions.DELETE_ARTICLE),
      switchMap((article) => {
        let Article = article['payload'];
        let key = Article['key'];
        const req = new HttpRequest('DELETE',
          'https://smartslimenglishproject.firebaseio.com/articles/' + key + '.json',
          {reportProgress: true});
        return this.httpClient.request(req);
      }),
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClient) {
  }
}
