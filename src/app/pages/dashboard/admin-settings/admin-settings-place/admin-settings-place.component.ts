import {Component, OnInit, Input} from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'ngx-admin-settings-place',
  templateUrl: './admin-settings-place.component.html',
  styleUrls: ['./admin-settings-place.component.scss']
})
export class AdminSettingsPlaceComponent implements OnInit {


  constructor(private fanZoneService: FanZoneService,
              protected router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,) {
  }


  ngOnInit() {


  }

  close(){

    this.router.navigateByUrl('dashboard/pages/admin-settings');
  }
}
