import { NgModule } from '@angular/core';
import { FanZoneComponent } from './fanzone.component';
import { ItemFormComponent } from './itemForm/itemForm.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { FanZoneRoutingModule } from './fan-zone-routing.module';
import { FanZoneItems } from './fan-zone-items/fan-zone-items.component';
import { ItemCardComponent } from './itemCard/itemCard.component';

const FAN_ZONE_COMPONENTS = [
    FanZoneComponent,
    ItemFormComponent,
    FanZoneItems,
    ItemCardComponent,
]

@NgModule({
    imports: [
        ThemeModule,
        FanZoneRoutingModule,
    ],
    declarations: [
        ...FAN_ZONE_COMPONENTS,
    ]
})
export class FanZoneModule {}