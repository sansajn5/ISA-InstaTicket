import {Component, OnInit, Input} from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {forEach} from "@angular/router/src/utils/collection";
import {AdminSettingsService} from "../../../../@theme/services/admin-settings.service";


@Component({
  selector: 'ngx-admin-settings-system',
  templateUrl: './admin-settings-system.component.html',
  styleUrls: ['./admin-settings-system.component.scss']
})
export class AdminSettingsSystemComponent implements OnInit {

  users: any = [];
  authorities: any = [];

  constructor(private fanZoneService: FanZoneService,
              private adminSettingService: AdminSettingsService,
              protected router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,) {
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
