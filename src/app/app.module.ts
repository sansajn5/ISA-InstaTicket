import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './@theme/guard/auth.guard';
import { AuthService } from './@theme/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {PlaceService} from "./@theme/services/place.service";
import {FanZoneService} from "./@theme/services/fanZone.service";
import {RepertoryService} from "./@theme/services/repertory.service";
import {ProjectionService} from "./@theme/services/projection.service";
import {HallService} from "./@theme/services/hall.service";
import {EventService} from "./@theme/services/event.service";
import { UserProfileService } from "./@theme/services/user-profile.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    AuthGuard,
    AuthService,
    PlaceService,
    FanZoneService,
    RepertoryService,
    ProjectionService,
    HallService,
    EventService,
    HallService,
    UserProfileService,
  ],
})
export class AppModule {
}
