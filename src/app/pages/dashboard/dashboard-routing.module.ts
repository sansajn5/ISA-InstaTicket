import { DashboardComponent } from "./dashboard.component";
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router/src/config";
import { RouterModule } from "@angular/router";
import {PlaceListComponent} from "./placeList/placeList.component";
import {PlaceComponent} from "./place/place.component";
import {ItemFormComponent} from "../fanZone/itemForm/itemForm.component";
import {AddPlaceComponent} from "./addPlace/addPlace.component";
import {RepertoryComponent} from "./repertory/repertory.component";
import {ProjectionComponent} from "./projection/projection.component";
import {EventComponent} from "./event/event.component";
import {HallComponent} from "./hall/hall.component";
import {FanZoneComponent} from "../fanZone/fanZone.component";

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: ':place/place/:id', component: PlaceComponent },
    { path: 'fanZoneItems', component: FanZoneComponent},
    { path: 'addPlace', component: AddPlaceComponent},
    { path : 'place/repertory/:id', component: RepertoryComponent},
    { path : 'place/repertory/projection/:id', component: ProjectionComponent},
    { path : ':place/place/:id/events', component: EventComponent},
    { path : 'place/:id/halls', component: HallComponent},

    { path: 'fanZoneItems', component: FanZoneComponent},
    { path: 'fanzone/:mode/:id', component: ItemFormComponent}
    { path: ':place', component: PlaceListComponent},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }

