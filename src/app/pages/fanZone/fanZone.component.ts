import {Component, OnInit} from "@angular/core";

import {FanZoneService} from "../../@theme/services/fanZone.service";

@Component({
  selector : 'ngx-fanzone-items',
  templateUrl: './fanZone.component.html',
  styleUrls: ['./fanZone.component.scss'],
})

export class FanZoneComponent implements OnInit {

  items = []

  constructor(private fanZoneService: FanZoneService) {}

  ngOnInit() {

    this.fanZoneService.getItems().subscribe(data => {
      console.log(data);
      this.items = data.items;
    })

  }
}
