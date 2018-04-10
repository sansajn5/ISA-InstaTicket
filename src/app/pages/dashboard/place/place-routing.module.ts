import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PlaceListComponent} from "./placeList/placeList.component";
import {PlaceComponent} from "./place-detail/place-detail.component";
import {EventComponent} from "./event/event.component";
import {HallComponent} from "./hall/hall.component";
import {ProjectionComponent} from "./projection/projection.component";
import {RepertoryComponent} from "./repertory/repertory.component";
import {ProjectionsComponent} from "./projection-admin/projections.component";
import {RepertoriesComponent} from "./repertories/repertories.component";
import {AddPlaceComponent} from "./addPlace/addPlace.component";
import {AddEventComponent} from "./add-event/addEvent.component";
import {AddHallComponent} from "./add-hall/addHall.component";
import {AddProjectionComponent} from "./add-projection/addProjection.component";

const routes: Routes = [


  { path : ':place/place/:id', component: PlaceComponent },
  { path : ':place/place/:id/events', component: EventComponent},
  { path : ':place/place/:id/halls', component: HallComponent},
  { path : 'repertory/:id', component: RepertoryComponent},
  {path : 'repertory/projection/:id' , component: ProjectionComponent},
  { path: ':place/place/:id/repertories-in-place-detail', component: RepertoriesComponent},
  { path: 'add-place', component: AddPlaceComponent},
  { path: ':place/place/:id/add-event' , component: AddEventComponent},
  { path: ':place/place/:id/add-hall', component: AddHallComponent},
  { path: ':place/place/:id/add-projection', component: AddProjectionComponent},
  { path: ':place/place/:id/repertory/:idRepertory', component: ProjectionsComponent},
  { path: ':place', component: PlaceListComponent},



]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceRoutingModule {}