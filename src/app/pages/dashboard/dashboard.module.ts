import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { CinemaComponent } from './cinema/cinema.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {FanZoneComponent} from "../fanZone/fanZone.component";


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    CinemaComponent,
    FanZoneComponent,
  ],
})
export class DashboardModule { }
