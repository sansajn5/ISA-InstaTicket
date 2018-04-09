import {ThemeModule} from "../../../@theme/theme.module";
import {PlaceRoutingModule} from "./place-routing.module";
import {PlaceListComponent} from "./placeList/placeList.component";
import {NgModule} from "@angular/core";
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

const PLACE_COMPONENTS = [
  PlaceListComponent,
  PlaceComponent,
  EventComponent,
  HallComponent,
  ProjectionComponent,
  RepertoryComponent,
  ProjectionComponent,
  ProjectionsComponent,
  RepertoriesComponent,
  AddPlaceComponent,
  AddEventComponent,
  AddHallComponent,
  AddProjectionComponent,
]
@NgModule({
  imports: [
    ThemeModule,
    PlaceRoutingModule,
  ],
  declarations: [
    ...PLACE_COMPONENTS,
  ]
})
export class PlaceModule {}
