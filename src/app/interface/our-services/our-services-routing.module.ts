import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OurServicesComponent } from './our-services.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { ShowServiceComponent } from './show-service/show-service.component';


const routes: Routes = [
  {
    path: '', component: OurServicesComponent, children: [
        { path: '', component: ServicesListComponent},
       // { path: 'admin',  loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard] },
        { path: ':id', component: ShowServiceComponent },
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurServicesRoutingModule { }
