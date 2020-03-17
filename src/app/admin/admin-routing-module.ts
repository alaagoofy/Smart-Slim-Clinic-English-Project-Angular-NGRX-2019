import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';



const adminRoutes: Routes = [
    {
        path: '', component: AdminComponent, children: [
            { path: '', component: HomeComponent },
            { path: 'services', loadChildren: './services/services.module#ServicesModule' },
            { path: 'articles', loadChildren: './articles/articles.module#ArticlesModule' },

           // { path: ':id', component: AddEditComponent },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AdminRoutingModule { }