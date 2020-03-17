import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesComponent } from './services.component';
import { AddEditComponent } from './add-edit/add-edit.component';


const routes: Routes = [
  {
    path: '', component: ServicesComponent, children: [
       { path: '', component: AddEditComponent },
        { path: ':id', component: AddEditComponent },
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
