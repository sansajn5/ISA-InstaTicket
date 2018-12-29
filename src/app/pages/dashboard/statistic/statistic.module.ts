import {StatisticComponent} from "./statistic-detail/statistic.component";
import {ThemeModule} from "../../../@theme/theme.module";
import {NgModule} from "@angular/core";
import {StatisticRoutingModule} from "./statistic-routing.module";
import {StatisticcComponent} from "./statisticc.component";
import {ResourceComponent} from "./resource/resource.component";
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

const STATISTIC_COMPONENTS = [
  StatisticComponent,
  ResourceComponent,
]

const CHARTS = [ NgxEchartsModule, NgxChartsModule, ChartModule,]

@NgModule({
  imports: [
    ThemeModule,
    StatisticRoutingModule,
    CHARTS
  ],
  declarations: [
    ...STATISTIC_COMPONENTS,
    StatisticcComponent,
  ]
})
export class StatisticModule {}
