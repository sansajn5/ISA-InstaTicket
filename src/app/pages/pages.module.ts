import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import {LogoutHelperComponent} from './logout-helper/logout-helper.component';
import { UserProfileModule } from './user-profile/user-profile.module';
  
const PAGES_COMPONENTS = [
  PagesComponent,
  LogoutHelperComponent,
];

@NgModule({
  imports: [
  PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    UserProfileModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
