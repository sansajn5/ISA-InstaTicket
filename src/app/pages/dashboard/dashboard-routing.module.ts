import { DashboardComponent } from "./dashboard.component";
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router/src/config";
import { RouterModule } from "@angular/router";

import {PlaceListComponent} from "./placeList/placeList.component";
import {PlaceComponent} from "./place/place.component";

import {FanZoneComponent} from "../fanZone/fanZone.component";
import {AddPlaceComponent} from "./addPlace/addPlace.component";
import {RepertoryComponent} from "./repertory/repertory.component";

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'cinemas', component: PlaceListComponent },
    { path: 'theathres', component: PlaceListComponent },
    { path: 'place/:id', component: PlaceComponent },
    { path: 'fanZoneItems', component: FanZoneComponent},
    { path: 'addPlace', component: AddPlaceComponent},
    { path : 'place/repertory/:id', component: RepertoryComponent},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
