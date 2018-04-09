import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {FanZoneComponent} from "../fanZone/fanZone.component";
import {ItemFormComponent} from "../fanZone/itemForm/itemForm.component";
import {ItemCardComponent} from "../fanZone/itemCard/itemCard.component";
import {StatisticComponent} from "./statistic/statistic.component";


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    FanZoneComponent,
    ItemFormComponent,
    ItemCardComponent,
    StatisticComponent,
  ],
})
export class DashboardModule { }
