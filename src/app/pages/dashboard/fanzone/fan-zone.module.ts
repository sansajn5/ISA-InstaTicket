import { NgModule } from '@angular/core';
import { FanZoneComponent } from './fanzone.component';
import { ItemFormComponent } from './item-form/itemForm.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { FanZoneRoutingModule } from './fan-zone-routing.module';
import { FanZoneItems } from './fan-zone-items/fan-zone-items.component';
import { ItemCardComponent } from './item-card/itemCard.component';
import {OfferFormComponent} from "./offer-form/offer-form.component";
import {NgbdDatepickerPopup} from "../../../@theme/components/datepicker-popup/datepicker-popup";
import {OffersRequestsComponent} from "./offers-requests/offers-requests.component";
import {OfferRequestCardComponent} from "./offer-request-card/offer-request-card.component";
import {OfferCardComponent} from "./offer-card/offer-card.component";
import {BidsComponent} from "./bids/bids.component";
import {BidComponent} from "./bid/bid.component";
import {ItemReservationComponent} from "./item-reservation/item-reservation.component";

const FAN_ZONE_COMPONENTS = [
    FanZoneComponent,
    ItemFormComponent,
    FanZoneItems,
    ItemCardComponent,
    ItemReservationComponent,
    OfferFormComponent,
    OffersRequestsComponent,
    OfferRequestCardComponent,
    OfferCardComponent,
    BidsComponent,
    BidComponent,

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
