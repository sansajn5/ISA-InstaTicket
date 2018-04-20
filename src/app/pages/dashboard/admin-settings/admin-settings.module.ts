

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

const ADMIN_SETTINGS_COMPONENTS = [
  AdminSettingsComponent,
  AdminSettingsHomeComponent,
  AdminSettingsSystemComponent,
  AdminSettingsPlaceComponent,
  AdminSettingsFanzoneComponent,
  AdminSystemCardComponent,
  AdminFanZoneCardComponent,

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