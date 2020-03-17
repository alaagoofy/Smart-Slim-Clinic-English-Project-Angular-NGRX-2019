import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';

import * as authActions from './Auth/store/auth.actions';
import * as articlesAction from './interface/articles/store/articles.actions';
import * as ServicesAction from './interface/our-services/store/our-services.actions';
import * as AppRed from './app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppRed.AppState>, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.store.dispatch(new authActions.GetUser());
    this.store.select('auth')
      .subscribe(user => {
        if (user.authenticated) {
          let returnURL = this.route.snapshot.queryParamMap.get('returnURL');
          if (returnURL) {
            this.router.navigateByUrl(returnURL);
          }
        }
      });

    this.store.dispatch(new articlesAction.GetArticles());
    this.store.dispatch(new ServicesAction.GetServices());

  }

  // ---------------------------- Scroll to top
  onActivate(event) {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 35); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
