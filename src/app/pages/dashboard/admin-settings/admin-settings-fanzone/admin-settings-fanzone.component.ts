import {Component, OnInit, Input} from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {forEach} from "@angular/router/src/utils/collection";
import {AdminSettingsService} from "../../../../@theme/services/admin-settings.service";


@Component({
  selector: 'ngx-admin-settings-fanzone',
  templateUrl: './admin-settings-fanzone.component.html',
  styleUrls: ['./admin-settings-fanzone.component.scss']
})
export class AdminSettingsFanzoneComponent implements OnInit {

  users: any = [];
  authorities: any = [];


  constructor(private fanZoneService: FanZoneService,
              protected router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private adminSettingService: AdminSettingsService,) {
  }


  ngOnInit() {

    this.adminSettingService.getUsers().toPromise()
      .then(data => {

        this.users = data.users;
        this.authorities = data.authorities;
        console.log(this.authorities)
      })
  }

  close() {

    this.router.navigateByUrl('dashboard/pages/admin-settings');
  }
}
