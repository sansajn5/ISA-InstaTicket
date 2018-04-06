import {Component, OnInit} from "@angular/core";

import {FanZoneService} from "../../@theme/services/fanZone.service";
import {Router} from "@angular/router";

@Component({
  selector : 'ngx-fanzone-items',
  templateUrl: './fanZone.component.html',
  styleUrls: ['./fanZone.component.scss'],
})

export class FanZoneComponent implements OnInit {

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

    this.router.navigateByUrl('dashboard/add-new-item');




  }


  officialShopClick() {
    this.router.navigateByUrl('dashboard/fanZoneItems');

    this.class_tab1 = 'nav-link active';
    this.class_tab2 = 'nav-link';

    this.show_items = true;
    this.show_offers = false;


  }

  offersClick() {

    this.router.navigateByUrl('dashboard/fanZoneItems');

    this.class_tab2 = 'nav-link active';
    this.class_tab1 = 'nav-link';

    this.show_items = false;
    this.show_offers = true;


  }

  updateList(data) {
    console.log(data);
    this.items =  this.items.filter(el => el.id != data.item.id);
  }

}
