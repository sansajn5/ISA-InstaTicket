import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

/*
import {PlaceComponent} from "./place/place.component";


import {AddPlaceComponent} from "./addPlace/addPlace.component";
import {RepertoryComponent} from "./repertory/repertory.component";
import {ProjectionComponent} from "./projection/projection.component";
import {EventComponent} from "./event/event.component";
import {HallComponent} from "./hall/hall.component";
import {AddEventComponent} from "./add-event/addEvent.component";
import {AddHallComponent} from "./add-hall/addHall.component";
import {RepertoriesComponent} from "./repertories/repertories.component";
import {ProjectionsComponent} from "./projections/projections.component";

import {FanZoneComponent} from "../fanZone/fanZone.component";
import {ItemFormComponent} from "../fanZone/itemForm/itemForm.component";
import {ItemCardComponent} from "../fanZone/itemCard/itemCard.component"; */

import {StatisticComponent} from "./statistic/statistic.component";


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,

    /*
    PlaceComponent,
    AddPlaceComponent,
    RepertoryComponent,
    ProjectionComponent,
    EventComponent,
    HallComponent,
    AddEventComponent,
    AddHallComponent,
    RepertoriesComponent,
    ProjectionsComponent,

    FanZoneComponent,
    ItemFormComponent,
    ItemCardComponent,*/

    StatisticComponent,
  ]
})
export class DashboardModule { }
