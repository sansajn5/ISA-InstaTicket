import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlaceService} from "../../../../@theme/services/place.service";
import {HallService} from "../../../../@theme/services/hall.service";
import {Projection} from "../../../../@theme/models/projection.model";
import {ProjectionService} from "../../../../@theme/services/projection.service";
import {ToastrService} from "ngx-toastr";
//import {IMyDpOptions} from 'mydatepicker';

@Component ({
  templateUrl: './addProjection.component.html',
  styleUrls: ['./addProjection.component.scss'],
})

export class AddProjectionComponent implements OnInit {
  type: string;
  eventsPlace = []
  halls = []
  id: string;

  public form: FormGroup;
  public eventName: AbstractControl;
  public hallName: AbstractControl;
  public startTime: AbstractControl;
  public endTime: AbstractControl;
  projection: Projection;
  public method_name = 'DODAJ';
  public mode: String;

  constructor(protected router: Router,
              private route: ActivatedRoute,
              private placeService: PlaceService,
              private fb: FormBuilder,
              private  hallService: HallService,
              private projectionService: ProjectionService,
              private toastr: ToastrService) {
    this.form = this.fb.group({
      'eventName': ['', Validators.compose([Validators.required])],
      'hallName': ['', Validators.compose([Validators.required]) ],
      'startTime': ['', Validators.compose([Validators.required])],
      'endTime': ['', Validators.compose([Validators.required])],

    })
    this.eventName = this.form.controls['eventName'];
    this.hallName = this.form.controls['hallName'];
    this.startTime = this.form.controls['startTime'];
    this.endTime = this.form.controls['endTime'];
  }

  ngOnInit() {
    const place = this.route.snapshot.params.place;
    const idProjection = this.route.snapshot.params.idProjection;
    this.id = this.route.snapshot.params.id;

    this.placeService.getEventInPlace(this.id).subscribe(data => {
      this.eventsPlace = data.events;
    })

    this.hallService.getHallsInPlace(this.id).subscribe(data => {
      this.halls = data.halls;
    })

    this.mode = this.route.snapshot.params.mode;
    if ( this.mode == 'edit') {
      const id = this.route.snapshot.params.id;
      this.projectionService.getProjection(idProjection).subscribe(data => {
        this.method_name = 'IZMENI';
        this.form.controls['eventName'].setValue(data.projection.event.name);
        this.form.controls['hallName'].setValue( data.projection.hall.name);
        this.form.controls['startTime'].setValue(data.projection.startTime);
        this.form.controls['endTime'].setValue(data.projection.endTime);

      })
    }else if (this.mode == 'add') {
    }
    else {
      this.router.navigateByUrl('dashboard/pages/place')
    }

    if (place === 'cinemas') {
      this.type = 'Film';
    } else {
      this.type = 'Predstava';
    }
  }

  confirmClick() {
    if (this.method_name === 'DODAJ') {
      this.addProjection();
    } else {
      this.editProjection();
    }
  }

  addProjection(): any {
    const projection = new Projection(
      this.eventName.value,
      this.hallName.value,
      this.startTime.value,
      this.endTime.value,
      document.getElementById('date_picker').getAttribute('date')
    );
    const id = this.route.snapshot.params.id;
    this.projectionService.createProjection(projection, id).toPromise()
      .then(data=> {
        this.toastr.clear();
        this.toastr.success('Uspesno dodavanje!');
        const idPlace = this.route.snapshot.params.id;
        const place = this.route.snapshot.params.place;
        this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + idPlace + '/repertories-in-place-detail');
      })
  }

  editProjection() {

  }
  exit() {
    const place = this.route.snapshot.params.place;
    this.id = this.route.snapshot.params.id;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + this.id + '/repertories-in-place-detail')
  }

}
