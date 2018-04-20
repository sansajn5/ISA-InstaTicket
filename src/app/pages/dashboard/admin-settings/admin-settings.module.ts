

import {AdminSettingsComponent} from "./admin-settings.component";
import {AdminSettingsRoutingModule} from "./admin-settings-routing.module";
import {ThemeModule} from "../../../@theme/theme.module";
import {NgModule} from "@angular/core";
import {AdminSettingsHomeComponent} from "./admin-settings-home/admin-settings-home.component";
import {AdminSettingsSystemComponent} from "./admin-settings-system/admin-settings-system.component";
import {AdminSettingsPlaceComponent} from "./admin-settings-place/admin-settings-place.component";
import {AdminSettingsFanzoneComponent} from "./admin-settings-fanzone/admin-settings-fanzone.component";
import {AdminSystemCardComponent} from "./admin-system-card/admin-system-card.component";
import {AdminFanZoneCardComponent} from "./admin-fanzone-card/admin-fanzone-card.component";
import {AdminPlaceButtonComponent} from "./admin-place-button/admin-place-button.component";
import {AdminSettingsPlaceSpecificComponent} from "./admin-settings-place-specific/admin-settings-place-specific.component";
import {AdminPlaceCardComponent} from "./admin-place-card/admin-place-card.component";

const ADMIN_SETTINGS_COMPONENTS = [
  AdminSettingsComponent,
  AdminSettingsHomeComponent,
  AdminSettingsSystemComponent,
  AdminSettingsPlaceComponent,
  AdminSettingsFanzoneComponent,
  AdminSystemCardComponent,
  AdminFanZoneCardComponent,
  AdminPlaceButtonComponent,
  AdminSettingsPlaceSpecificComponent,
  AdminPlaceCardComponent,

]

@NgModule({
  imports: [
    ThemeModule,
    AdminSettingsRoutingModule,


  ],
  declarations: [
    ...ADMIN_SETTINGS_COMPONENTS,
  ],
})
export class AdminSettingsModule {}
