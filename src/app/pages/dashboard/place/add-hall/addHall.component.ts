import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HallService} from "../../../../@theme/services/hall.service";
import {Hall} from "../../../../@theme/models/hall.model";

@Component({

  templateUrl: './addHall.component.html',
  styleUrls: ['./addHall.component.scss'],

})

export class AddHallComponent {


  public form: FormGroup;
  public name: AbstractControl;
  public col: AbstractControl;
  public row: AbstractControl;
  hall: Hall;


  constructor(private hallService: HallService,
              protected router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute) {
    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required])],
      'col': ['', Validators.compose([Validators.required,
        Validators.pattern('[0-9]+')])],
      'row': ['', Validators.compose([Validators.required,
        Validators.pattern('[0-9]+')])],

    })
    this.name = this.form.controls['name'];
    this.col = this.form.controls['col'];
    this.row = this.form.controls['row'];

  }

  createHall(): any {
    const hall = new Hall(
      this.name.value,
      this.col.value,
      this.row.value,
    );
    const id = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;

    this.hallService.createHall(hall, id).toPromise()
      .then(data => {
        this.toastr.clear();
        this.toastr.success('Uspesno dodavanje!');
        this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + id + '/halls');
      })
  }

  exit() {
    const id = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + id + '/halls');
  }
}
