import { DashboardComponent } from "./dashboard.component";
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router/src/config";
import { RouterModule } from "@angular/router";
import { CinemaComponent } from "./placeList/cinema.component";
import {PlaceComponent} from "./place/place.component";


const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'cinemas', component: CinemaComponent },
    { path: 'place/:id', component: PlaceComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
