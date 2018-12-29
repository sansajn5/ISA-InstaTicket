import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import {LogoutHelperComponent} from './logout-helper/logout-helper.component';

const routes: Routes = [
  {  path: '',  component: PagesComponent, children: [{
    path: 'pages',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  }, {
    path: 'user' ,
    loadChildren: './user-profile/user-profile.module#UserProfileModule',
  }, {
    path: 'logout', component: LogoutHelperComponent,
  }, { path: '', redirectTo: 'pages' , pathMatch: 'full' }
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
