import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { PlaceListComponent} from './placeList/placeList.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {PlaceComponent} from "./place/place.component";

import {FanZoneComponent} from "../fanZone/fanZone.component";
import {AddPlaceComponent} from "./addPlace/addPlace.component";
import {RepertoryComponent} from "./repertory/repertory.component";
import {ProjectionComponent} from "./projection/projection.component";
import {EventComponent} from "./event/event.component";
import {HallComponent} from "./hall/hall.component";



@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    PlaceListComponent,
    PlaceComponent,
    FanZoneComponent,
    AddPlaceComponent,
    RepertoryComponent,
    ProjectionComponent,
    EventComponent,
    HallComponent,
  ],
})
export class DashboardModule { }
