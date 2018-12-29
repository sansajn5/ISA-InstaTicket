import {Component, Input, OnInit} from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {forEach} from "@angular/router/src/utils/collection";
import {AdminSettingsService} from "../../../../@theme/services/admin-settings.service";

@Component({
  selector: 'ngx-admin-place-button',
  templateUrl: './admin-place-button.component.html',
  styleUrls: ['./admin-place-button.component.scss']
})
export class AdminPlaceButtonComponent implements OnInit {

  @Input() id: any;
  @Input() name: string;


  constructor(private adminSettingsService: AdminSettingsService,
              protected router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,) {
  }


  ngOnInit() {



  }

  showPlaceAdmins() {

    this.router.navigateByUrl('dashboard/pages/admin-settings/place/' + this.id);
  }

}
