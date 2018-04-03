import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { CinemaComponent } from './cinema/cinema.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    CinemaComponent,
  ],
})
export class DashboardModule { }
