import {Component, OnInit, Input} from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {forEach} from "@angular/router/src/utils/collection";
import {PlaceService} from "../../../../@theme/services/place.service";


@Component({
  selector: 'ngx-admin-settings-place',
  templateUrl: './admin-settings-place.component.html',
  styleUrls: ['./admin-settings-place.component.scss']
})
export class AdminSettingsPlaceComponent implements OnInit {

  places: any = [];


  constructor(private placeService: PlaceService,
              private fanZoneService: FanZoneService,
              protected router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,) {
  }


  ngOnInit() {


    this.placeService.getCinemas().toPromise()
      .then(data=>{

        for(let place of data.cinemas){
          this.places.push(place);

        }


      })

    this.placeService.getTheathres().toPromise()
      .then(data=>{

        for(let place of data.theaters){
          this.places.push(place);

        }


      })
  }

  close(){

    this.router.navigateByUrl('dashboard/pages/admin-settings');
  }
}
