import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AdminRoutingModule } from './admin-routing-module';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { ToolsModule } from './tools/tools.module';

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    ToolsModule
  ]
})
export class AdminModule { }
