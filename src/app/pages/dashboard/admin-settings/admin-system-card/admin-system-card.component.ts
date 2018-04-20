import {Component, Input, OnInit} from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {forEach} from "@angular/router/src/utils/collection";
import {AdminSettingsService} from "../../../../@theme/services/admin-settings.service";

@Component({
  selector: 'ngx-admin-system-card',
  templateUrl: './admin-system-card.component.html',
  styleUrls: ['./admin-system-card.component.scss']
})
export class AdminSystemCardComponent implements OnInit {

  @Input() id: any;
  @Input() username: string;
  @Input() authorities: any = [];

  addAllowed: boolean = true;
  deleteAllowed: boolean = false;

  mineAuths: any = [];

  constructor(private adminSettingsService: AdminSettingsService,
              protected router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,) {
  }


  ngOnInit() {


    for(let auth of this.authorities) {

      if(auth.id == this.id) {

        this.mineAuths = auth.authorities;

        for(let au of this.mineAuths) {

          if (au === 'SUPER_ADMIN') {

            this.addAllowed = false;
            this.deleteAllowed = true;
          }
        }
      }
    }
  }

  addSystemAdminRole() {

    this.adminSettingsService.addSystemAdminRole(this.id).toPromise()
      .then(data => {

        this.toastr.success('Korisniku "' + data.user.username + '"dodeljena uloga ADMINISTRATOR SISTEMA');
;
        window.location.reload();

      })

  }


  deleteSystemAdminRole() {

    this.adminSettingsService.deleteSystemAdminRole(this.id).toPromise()
      .then(data => {

        this.addAllowed = true;
        this.deleteAllowed = false;
        this.toastr.success('Korisniku "' + data.user.username + '"uklonjena uloga ADMINISTRATOR SISTEMA');

        window.location.reload();
      })

  }
}
