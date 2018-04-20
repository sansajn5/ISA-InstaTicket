import {Component, OnInit, Input} from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'ngx-admin-settings-home',
  templateUrl: './admin-settings-home.component.html',
  styleUrls: ['./admin-settings-home.component.scss']
})
export class AdminSettingsHomeComponent implements OnInit {


  constructor(private fanZoneService: FanZoneService,
              protected router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,) {
  }


  ngOnInit() {


  }

  close(){

    this.router.navigateByUrl('dashboard/pages/');
  }


  openSystemAdmins(){

    this.router.navigateByUrl('dashboard/pages/admin-settings/system')
  }

  openPlaceAdmins(){

    this.router.navigateByUrl('dashboard/pages/admin-settings/place')

  }

  openFanZoneAdmins(){

    this.router.navigateByUrl('dashboard/pages/admin-settings/fanzone')
  }
}
