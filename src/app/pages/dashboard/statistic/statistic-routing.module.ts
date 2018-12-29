import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StatisticComponent} from "./statistic-detail/statistic.component";
import {StatisticcComponent} from "./statisticc.component";
import {ResourceComponent} from "./resource/resource.component";

const routes: Routes = [
  { path: '', component: StatisticcComponent },
  { path: ':place', component: StatisticComponent},
  { path: ':place/:id/:mode', component: ResourceComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticRoutingModule {}
