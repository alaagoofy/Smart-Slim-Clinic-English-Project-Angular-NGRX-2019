import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from './articles.component';
import { ShowArticleComponent } from './show-article/show-article.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import {AuthGuard} from '../../Auth/auth-guard.service';

const articlesRoutes: Routes = [
    {
        path: '', component: ArticlesComponent, children: [
            { path: '', component: ArticlesListComponent },
           // { path: 'admin',  loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard] },
            { path: ':id', component: ShowArticleComponent },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(articlesRoutes)
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class ArticlesRoutingModule { }
