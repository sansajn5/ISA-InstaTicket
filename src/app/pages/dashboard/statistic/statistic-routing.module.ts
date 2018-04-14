import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StatisticComponent} from "./statistic-detail/statistic.component";
import {StatisticcComponent} from "./statisticc.component";

const routes: Routes = [
  { path: '', component: StatisticcComponent },
  { path: ':place', component: StatisticComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticRoutingModule {}
