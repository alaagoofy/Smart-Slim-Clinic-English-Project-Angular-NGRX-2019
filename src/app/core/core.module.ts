import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../core/header/header.component';
import { HomeComponent } from '../core/home/home.component';
import { FooterComponent } from '../core/footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { ArticlesSectionComponent } from './home/articles-section/articles-section.component';
import { ServicesSectionComponent } from './home/services-section/services-section.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ArticlesSectionComponent,
    ServicesSectionComponent,

  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
