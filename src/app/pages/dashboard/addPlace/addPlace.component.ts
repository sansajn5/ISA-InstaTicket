import {Component} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlaceService} from "../../../@theme/services/place.service";
import {Router} from "@angular/router";
import {Place} from "../../../@theme/models/place.model";
import {ToastrService} from "ngx-toastr";

@Component({

  templateUrl: './addPlace.component.html',
  styleUrls: ['./addPlace.component.scss'],

})
 export class AddPlaceComponent {

  public form: FormGroup;
  public name: AbstractControl;
  public type: AbstractControl;
  public address: AbstractControl;
  public description: AbstractControl;
  place: Place;


  constructor(private placeService: PlaceService,
              protected router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService
               ) {
    this.form = this.fb.group({
      'name' : ['' , Validators.compose([Validators.required])],
      'type' : ['Bioskop'],
      'address' : [''],
      'description' : ['']

    })
    this.name = this.form.controls['name'];
    this.type = this.form.controls['type'];
    this.address = this.form.controls['address'];
    this.description = this.form.controls['description'];


  }

  createPlace(): any {
    const place = new Place(
      this.name.value,
      this.type.value,
      this.address.value,
      this.description.value,
    );
    console.log(JSON.stringify(place))
    this.placeService.createPlace(place).toPromise()
      .then(data=> {
        this.toastr.clear();
        this.toastr.success('Uspesno dodat bioskop ili pozoriste!');

        this.router.navigateByUrl('dashboard');
      })
  }
}
