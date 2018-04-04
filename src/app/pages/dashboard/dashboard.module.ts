import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { CinemaComponent } from './placeList/cinema.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {PlaceComponent} from "./place/place.component";

import {FanZoneComponent} from "../fanZone/fanZone.component";
import {AddPlaceComponent} from "./addPlace/addPlace.component";



@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    CinemaComponent,
    PlaceComponent,
    FanZoneComponent,
    AddPlaceComponent,
  ],
})
export class DashboardModule { }
