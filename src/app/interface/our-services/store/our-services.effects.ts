import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';

import * as ServicesActions from './our-services.actions';
import {OurServices} from '../our-services.model';

@Injectable()
export class ServicesEffects {

  url = 'https://smartslimenglishproject.firebaseio.com/Services.json/';

// ------------------------Get and Set Services From DB
  @Effect()
  GetServices = this.actions$
    .pipe(ofType(ServicesActions.GET_SERVICES),
      switchMap(() => {
        return this.httpClient.get<OurServices[]>(this.url, {
          observe: 'body',
          responseType: 'json'
        });
      }), map(
        (Services) => {
          if (Services) {
            const mappedServices = Object.keys(Services).map(key => ({key, ...Services[key]}));
            return {
              type: ServicesActions.SET_SERVICES,
              payload: mappedServices
            };
          } else {
            return {
              type: ServicesActions.SET_SERVICES,
              payload: []
            };
          }

        }
      )
    );

  // ---------------------------------------------Add New Service
  @Effect({dispatch: false})
  NewArticle = this.actions$
    .pipe(ofType(ServicesActions.ADD_SERVICE),
      switchMap((service) => {
        let Service = service['payload'];
        const req = new HttpRequest('POST', this.url, Service/*, { reportProgress: true }*/);
        return this.httpClient.request(req);
      }),

    );

  // ------------------------------------------------------Edit Article
  @Effect({dispatch: false})
  UpdateArticle = this.actions$
    .pipe(ofType(ServicesActions.EDIT_SERVICE),
      switchMap((article) => {
        let Article = article['payload'];
        let finalArticle = Article['value'];
        let getID = Article['key'];
        const req = new HttpRequest('PUT',
          'https://smartslimenglishproject.firebaseio.com/Services/' + getID + '.json',
          finalArticle, {reportProgress: true});
        return this.httpClient.request(req);
      }),
    );

// ----------------------------------------------------Delete Article
  @Effect({dispatch: false})
  DeleteArticle = this.actions$
    .pipe(ofType(ServicesActions.DELETE_SERVICE),
      switchMap((article) => {
        let Article = article['payload'];
        let key = Article['key'];
        const req = new HttpRequest('DELETE',
          'https://smartslimenglishproject.firebaseio.com/Services/' + key + '.json',
          {reportProgress: true});
        return this.httpClient.request(req);
      }),
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClient) {
  }
}
