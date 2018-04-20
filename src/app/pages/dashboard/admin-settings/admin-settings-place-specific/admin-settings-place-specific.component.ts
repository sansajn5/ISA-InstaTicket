import {Component, OnInit, Input} from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {forEach} from "@angular/router/src/utils/collection";
import {AdminSettingsService} from "../../../../@theme/services/admin-settings.service";
import {PlaceService} from "../../../../@theme/services/place.service";


@Component({
  selector: 'ngx-admin-settings-place-specific',
  templateUrl: './admin-settings-place-specific.component.html',
  styleUrls: ['./admin-settings-place-specific.component.scss']
})
export class AdminSettingsPlaceSpecificComponent implements OnInit {

  users: any = [];
  places: any = [];

  @Input() id: any;
  @Input() name: string;


  constructor(private fanZoneService: FanZoneService,
              private placeService: PlaceService,
              protected router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private adminSettingService: AdminSettingsService,) {
  }


  ngOnInit() {

    this.id = this.route.snapshot.params.id;



    this.adminSettingService.getUsers().toPromise()
      .then(data => {

        this.users = data.users;

      })


    this.placeService.getCinemas().toPromise()
      .then(data=>{

        for(let place of data.cinemas){
          this.places.push(place);

          if (place.id == this.id) {

            this.name = place.name;
          }

        }


      })

    this.placeService.getTheathres().toPromise()
      .then(data=>{

        for (let place of data.theaters){
          this.places.push(place);

          if (place.id == this.id) {

            this.name = place.name;
          }
        }


      })




  }

  close() {

    this.router.navigateByUrl('dashboard/pages/admin-settings/place');
  }
}
