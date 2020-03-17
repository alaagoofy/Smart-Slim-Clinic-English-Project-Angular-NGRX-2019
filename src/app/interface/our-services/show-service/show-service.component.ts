import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { OurServices } from '../our-services.model';
import * as ServicesRed from '../store/our-services.reducers'

@Component({
  selector: 'app-show-service',
  templateUrl: './show-service.component.html'
})
export class ShowServiceComponent implements OnInit {

  Service: OurServices
  id: string;
  pageLoad = false;
  subScription: Subscription;

  constructor(private route: ActivatedRoute,
    private store: Store<ServicesRed.FeatureState>, private router: Router) { }

  ngOnInit() {
    this.subScription = this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.subScription = this.store.select('Services')
          .subscribe(res => {
            if (res.Services.length !== 0) {
              this.Service = res.Services.find(service => service['key'] == this.id);
              if (!this.Service) {
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
