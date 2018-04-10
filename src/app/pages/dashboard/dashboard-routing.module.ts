import { DashboardComponent } from "./dashboard.component";
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router/src/config";
import { RouterModule } from "@angular/router";

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'fan-zone' , loadChildren: './fanzone/fan-zone.module#FanZoneModule' },
    { path: 'place' , loadChildren: './place/place.module#PlaceModule' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }

