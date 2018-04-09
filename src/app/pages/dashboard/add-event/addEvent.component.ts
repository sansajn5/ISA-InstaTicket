import {Component} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../@theme/services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {EventModel} from "../../../@theme/models/event.model";

@Component({

  templateUrl: './addEvent.component.html',
  styleUrls: ['./addEvent.component.scss'],

})

export class AddEventComponent {


  public form: FormGroup;
  public name: AbstractControl;
  public type: AbstractControl;
  public actors: AbstractControl;
  public director: AbstractControl;
  public duration: AbstractControl;
  public imageUrl: AbstractControl;
  public description: AbstractControl;
  event: Event;


  constructor(private eventService: EventService,
              protected router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute) {
    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(60)])],
      'type': ['', Validators.compose([Validators.required, Validators.min(1), Validators.maxLength(50)])],
      'actors': ['' , Validators.compose([Validators.maxLength(5000), Validators.minLength(0)])],
      'director': ['' , Validators.compose([Validators.maxLength(50), Validators.minLength(0)])],
      'duration': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+')])],
      'image': ['' , Validators.compose([Validators.maxLength(5000), Validators.minLength(0)])],
      'description': [''],



    })
    this.name = this.form.controls['name'];
    this.type = this.form.controls['type'];
    this.actors = this.form.controls['actors'];
    this.director = this.form.controls['director'];
    this.duration = this.form.controls['duration'];
    this.imageUrl = this.form.controls['image'];
    this.description = this.form.controls['description'];
  }

  createEvent(): any {
    const event = new EventModel(
      this.name.value,
      this.type.value,
      this.actors.value,
      this.director.value,
      this.duration.value,
      this.imageUrl.value,
      this.description.value,
    );
    const id = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;

    this.eventService.createEvent(event , id).toPromise()
      .then(data=> {
        this.toastr.clear();
        this.toastr.success('Uspesno dodavanje!');
        this.router.navigateByUrl('dashboard/' + place + '/' + id + '/events');
      })
  }
}
