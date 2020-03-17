import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { OurServicesRoutingModule } from './our-services-routing.module';
import { OurServicesComponent } from './our-services.component';
import { ShowServiceComponent } from './show-service/show-service.component';
import { CommentsComponent } from './show-service/comments/comments.component';
import { LatestListComponent } from './show-service/latest-list/latest-list.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServiceCardComponent } from './services-list/service-card/service-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServicesListReducer } from './store/our-services.reducers';
import { ServicesEffects } from './store/our-services.effects';


@NgModule({
  declarations: [
    OurServicesComponent,
    ShowServiceComponent,
    CommentsComponent,
    LatestListComponent,
    ServicesListComponent,
    ServiceCardComponent
  ],
  imports: [
    CommonModule,
    OurServicesRoutingModule,
    SharedModule,
    FormsModule,
    StoreModule.forFeature('Services', ServicesListReducer),
    EffectsModule.forFeature([ServicesEffects]),
    AngularFireDatabaseModule,
  ]
})
export class OurServicesModule { }
