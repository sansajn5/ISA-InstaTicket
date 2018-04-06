import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { CinemaComponent } from './cinema/cinema.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {FanZoneComponent} from "../fanZone/fanZone.component";
import {ItemFormComponent} from "../fanZone/itemForm/itemForm.component";
import {ItemCardComponent} from "../fanZone/itemCard/itemCard.component";


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
    ItemFormComponent,
    ItemCardComponent,
  ],
})
export class DashboardModule { }
