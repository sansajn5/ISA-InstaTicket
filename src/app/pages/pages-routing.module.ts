import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import {LogoutHelperComponent} from './logout-helper/logout-helper.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  }, {
    path: 'user' ,
    loadChildren: './user-profile/user-profile.module#UserProfileModule',
  }, {
    path: 'logout', component: LogoutHelperComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
