import {StatisticComponent} from "./statistic-detail/statistic.component";
import {ThemeModule} from "../../../@theme/theme.module";
import {NgModule} from "@angular/core";
import {StatisticRoutingModule} from "./statistic-routing.module";
import {StatisticcComponent} from "./statisticc.component";

const STATISTIC_COMPONENTS = [
  StatisticComponent,
]
@NgModule({
  imports: [
    ThemeModule,
    StatisticRoutingModule,

  ],
  declarations: [
    ...STATISTIC_COMPONENTS,
    StatisticcComponent,
  ]
})
export class StatisticModule {}
