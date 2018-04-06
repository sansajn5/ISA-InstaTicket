import { DashboardComponent } from "./dashboard.component";
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router/src/config";
import { RouterModule } from "@angular/router";
import { CinemaComponent } from "./cinema/cinema.component";
import {FanZoneComponent} from "../fanZone/fanZone.component";
import {ItemFormComponent} from "../fanZone/itemForm/itemForm.component";

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'cinemas', component: CinemaComponent },

    { path: 'fanZoneItems', component: FanZoneComponent},
    { path: 'add-new-item', component: ItemFormComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }

