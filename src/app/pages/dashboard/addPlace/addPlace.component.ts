

import {Component} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {PlaceService} from "../../../@theme/services/place.service";
import {Router} from "@angular/router";
import {Place} from "../../../@theme/models/place.model";

@Component({

  templateUrl: './addPlace.component.html',
  styleUrls: ['./addPlace.component.scss'],

})
 export class AddPlaceComponent {



  constructor(private placeService: PlaceService,
              protected router: Router
             ) {


  }

  createPlace(): any {
    this.router.navigateByUrl('dashboard' );
  }
}
