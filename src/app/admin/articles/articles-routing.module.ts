import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from './articles.component';
import { AddEditComponent } from './add-edit/add-edit.component';


const routes: Routes = [
  {
    path: '', component: ArticlesComponent, children: [
       { path: '', component: AddEditComponent },
        { path: ':id', component: AddEditComponent },
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
