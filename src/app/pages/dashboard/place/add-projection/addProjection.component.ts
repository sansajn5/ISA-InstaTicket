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
  public regular: AbstractControl;
  public vip: AbstractControl;
  public sale: AbstractControl;
  projection: Projection;
  public method_name = 'DODAJ';
  public mode: String;
  public date: AbstractControl;

  public showClassicSeats: boolean;
  public row = 0;
  public colum = 0;
  public fullGrid = [];
  public m: boolean;

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
      'startTime': ['', Validators.compose([Validators.required,
        Validators.pattern('[0-9]{2}\:[0-9]{2}')]
        )],
      'endTime':  ['', Validators.compose([Validators.required,
        Validators.pattern('[0-9]{2}\:[0-9]{2}')]
      )],
      'regular': ['', Validators.compose([Validators.required,
        Validators.pattern('[0-9]+')]
      )],
      'vip': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+')])],
      'sale': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+')])]


    })
    this.eventName = this.form.controls['eventName'];
    this.hallName = this.form.controls['hallName'];
    this.startTime = this.form.controls['startTime'];
    this.endTime = this.form.controls['endTime'];
    this.regular = this.form.controls['regular'];
    this.vip = this.form.controls['vip'];
    this.sale = this.form.controls['sale'];
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
      this.m = true;
      const id = this.route.snapshot.params.id;
      this.projectionService.getProjection(idProjection).subscribe(data => {
        this.method_name = 'IZMENI';
        this.form.controls['eventName'].setValue(data.projection.event.name);
        this.form.controls['hallName'].setValue( data.projection.hall.name);
        this.form.controls['startTime'].setValue(data.projection.startTime);
        this.form.controls['endTime'].setValue(data.projection.endTime);
        this.form.controls['regular'].setValue(data.projection.regularPrice);
        this.form.controls['vip'].setValue(data.projection.vipPrice);
        this.form.controls['sale'].setValue(data.projection.sale);
        this.date = (data.projection.date);
        this.fullGrid = data.seats;
        const hall = this.halls.filter(el => el.name === this.hallName.value)[0]
        this.row = hall.row;
        this.colum = hall.col;
        this.showClassicSeats = true;
      })
    }else if (this.mode == 'add') {
      this.m = false;
    }
    else {
      this.router.navigateByUrl('dashboard/pages/place')
    }

    if (place === 'cinemas') {
      this.type = 'Film';
    } else {
      this.type = 'Predstava';
    }
    this.showClassicSeats = false;
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
      document.getElementById('date_picker').getAttribute('date'),
      this.fullGrid,
      this.regular.value,
      this.vip.value,
      this.sale.value
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
    const projectionId = this.route.snapshot.params.idProjection;
    const projection = new Projection(
      this.eventName.value,
      this.hallName.value,
      this.startTime.value,
      this.endTime.value,
      document.getElementById('date_picker').getAttribute('date'),
      this.fullGrid,
      this.regular.value,
      this.vip.value,
      this.sale.value
    );
    const id = this.route.snapshot.params.id;
    this.projectionService.editProjection(projection, id, projectionId).toPromise()
      .then(data=> {
        this.toastr.clear();
        this.toastr.success('Uspesno izvrsene izmene!');
        const idPlace = this.route.snapshot.params.id;
        const place = this.route.snapshot.params.place;
        this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + idPlace + '/repertories-in-place-detail');
      })
  }
  exit() {
    const place = this.route.snapshot.params.place;
    this.id = this.route.snapshot.params.id;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + this.id + '/repertories-in-place-detail')
  }

  changedCombo() {
    const hall = this.halls.filter(el => el.name === this.hallName.value)[0]
    if(hall) {
      this.row = hall.row;
      this.colum = hall.col;
      this.showClassicSeats = true;
    }else {
      this.fullGrid = [];
      this.showClassicSeats = false;
    }
  }

  gridIsSet(event) {
    this.fullGrid = event;
    this.showClassicSeats = false;
  }

}
