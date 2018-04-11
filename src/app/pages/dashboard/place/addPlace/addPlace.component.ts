import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {PlaceService} from "../../../../@theme/services/place.service";
import {Place} from "../../../../@theme/models/place.model";

@Component({

  templateUrl: './addPlace.component.html',
  styleUrls: ['./addPlace.component.scss'],

})
 export class AddPlaceComponent implements OnInit{

  public form: FormGroup;
  public name: AbstractControl;
  public type: AbstractControl;
  public address: AbstractControl;
  public description: AbstractControl;
  place: Place;

  public method_name = 'DODAJ';
  public mode: String;


  constructor(private placeService: PlaceService,
              protected router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute
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

  ngOnInit() {
    this.mode = this.route.snapshot.params.mode;
    if ( this.mode == 'edit') {

      const id = this.route.snapshot.params.id;
      this.placeService.getPlace(id).subscribe(data => {
        this.method_name = 'IZMENI';
        this.form.controls['name'].setValue(data.place.name);
        this.form.controls['address'].setValue(data.place.address);
        this.form.controls['description'].setValue(data.place.descripton);
        this.form.controls['type'].setValue(data.place.type);

      })
    }else if (this.mode == 'add') {}
    else {
      this.router.navigateByUrl('dashboard/pages/place')
    }
  }

  confirmClick() {
    if (this.method_name === 'DODAJ') {
      this.createPlace();
    } else {
      this.editPlace();
    }
  }

  createPlace(): any {
    const place = new Place(
      this.name.value,
      this.type.value,
      this.address.value,
      this.description.value,
    );
    this.placeService.createPlace(place).toPromise()
      .then(data=> {
        this.toastr.clear();
        this.toastr.success('Uspesno dodat bioskop ili pozoriste!');

        this.router.navigateByUrl('dashboard/pages');
      })
  }

  editPlace() {
    const place = new Place(
      this.name.value,
      this.type.value,
      this.address.value,
      this.description.value,
    );
    const id = this.route.snapshot.params.id;
    this.placeService.editPlace(id , place).toPromise()
      .then(data=> {
        this.toastr.clear();
        this.toastr.success('Uspesno izmenjeno!');
        const placeID = this.route.snapshot.params.place;
        this.router.navigateByUrl('dashboard/pages/place/' + placeID);
      })
  }

  exit() {
    this.router.navigateByUrl('dashboard/pages')
  }
}
