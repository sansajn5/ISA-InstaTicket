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
    this.id = this.route.snapshot.params.id;

    if (place === 'cinemas') {
      this.type = 'Film';
    } else {
      this.type = 'Predstava';
    }
    this.placeService.getEventInPlace(this.id).subscribe(data => {
      this.eventsPlace = data.events;
    })

    this.hallService.getHallsInPlace(this.id).subscribe(data => {
      this.halls = data.halls;
    })
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
        this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + idPlace + '/repertories-in-place-detail' );
      })
  }
  exit() {
    const place = this.route.snapshot.params.place;
    this.id = this.route.snapshot.params.id;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + this.id + '/repertories-in-place-detail')

  }

}
