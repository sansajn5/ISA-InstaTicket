import {Component, Input, OnInit} from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {forEach} from "@angular/router/src/utils/collection";
import {AdminSettingsService} from "../../../../@theme/services/admin-settings.service";
import {AdminRoleModel} from "../../../../@theme/models/adminRole.model";

@Component({
  selector: 'ngx-admin-place-card',
  templateUrl: './admin-place-card.component.html',
  styleUrls: ['./admin-place-card.component.scss']
})
export class AdminPlaceCardComponent implements OnInit {

  @Input() id: any;
  @Input() username: string;
  @Input() placeId: any;

  addAllowed: boolean = true;
  deleteAllowed: boolean = false;

  employed: any = [];

  constructor(private adminSettingService: AdminSettingsService,
              protected router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,) {
  }


  ngOnInit() {


    this.adminSettingService.getEmployedPlaceAdmins(this.placeId).toPromise()
      .then(data => {

        this.employed = data.users;

        for(let emp of this.employed) {

          if (emp.id == this.id) {

            this.addAllowed = false;
            this.deleteAllowed = true;
          }
        }
      })
  }


  addPlaceAdminRole() {

    const adminRole = new AdminRoleModel(this.placeId);

    this.adminSettingService.addPlaceAdminRole(adminRole,this.id).toPromise()
      .then(data => {

        this.toastr.success('Korisniku "' + data.user.username + '"dodeljena uloga ADMINISTRATOR OBJEKTA');
        this.addAllowed = false;
        this.deleteAllowed = true;

        window.location.reload();

      })
  }

  deletePlaceAdminRole() {

    const adminRole = new AdminRoleModel(this.placeId);

    this.adminSettingService.deletePlaceAdminRole(adminRole, this.id).toPromise()
      .then(data => {

        this.toastr.success('Korisniku "' + data.user.username + '"uklonjena uloga ADMINISTRATOR OBJEKTA');
        this.addAllowed = true;
        this.deleteAllowed = false;

        window.location.reload();

      })

  }

}
