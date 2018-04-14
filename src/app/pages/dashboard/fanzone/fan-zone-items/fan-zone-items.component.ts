import { Component } from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import { Router } from "@angular/router";

@Component({
    selector: 'ngx-fan-zone-items',
    templateUrl: './fan-zone-items.component.html',
    styleUrls: ['./fan-zone-items.component.scss']
})
export class FanZoneItems {

    items = []

  public class_tab1 = 'nav-link';
  public class_tab2 = 'nav-link';

  public show_items = true;
  public show_offers = false;

  constructor(private fanZoneService: FanZoneService, protected router: Router) {}

  ngOnInit() {

    this.fanZoneService.getItems().subscribe(data => {
      console.log(data);
      this.items = data.items;
      this.class_tab1 = 'nav-link active';
      this.class_tab2 = 'nav-link';

    })

  }

  addNewItem() {

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items/add');




  }


  officialShopClick() {
    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');

    this.class_tab1 = 'nav-link active';
    this.class_tab2 = 'nav-link';
    this.show_items = true;
    this.show_offers = false;

  }

  offersClick() {

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');

    this.class_tab2 = 'nav-link active';
    this.class_tab1 = 'nav-link';

    this.show_items = false;
    this.show_offers = true;


  }


  addNewOffer() {

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items/offers/offers/add');
  }

  offersRequestsClick() {

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items/offers/offers/requests');
  }

  updateList(data) {
    console.log(data);
    this.items =  this.items.filter(el => el.id != data.item.id);
  }

  updateEditedList(data) {
    this.items = data.items;
  }

}
