import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ServicessRed from '../../store/our-services.reducers'
import { OurServices } from '../../our-services.model';


@Component({
  selector: 'app-Service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent implements OnInit {
  
  @Input() Service: OurServices;
  @Input() index: number;

  constructor(private store: Store<ServicessRed.FeatureState>) { }

  ngOnInit() {
  }

}
