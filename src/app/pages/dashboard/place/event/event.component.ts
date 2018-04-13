import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NbSpinnerService} from "@nebular/theme";
import {PlaceService} from "../../../../@theme/services/place.service";
import {EventService} from "../../../../@theme/services/event.service";


@Component({

  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],

})

export class EventComponent implements OnInit {
  items = []
  add: string;
  type: string;

  constructor(private placeService: PlaceService,
              protected router: Router,
              private route: ActivatedRoute,
              private spinnerService: NbSpinnerService,
              private toastr: ToastrService,
              private  eventService: EventService) {
  }

  ngOnInit() {
    const place = this.route.snapshot.params.place;
    const id = this.route.snapshot.params.id;
    if (place === 'cinemas') {
      this.add = 'Dodaj film';
      this.type = 'Film';
    } else {
      this.add = 'Dodaj predstavu';
      this.type = 'Predstava';
    }

    this.placeService.getEventInPlace(id).subscribe(data => {
      this.items = data.events;
    })

  }

  openFormAddEvent() {
    const id = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + id + '/add/event')
  }

  editEvent(idEvent) {
    const id = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + id + '/edit/event/' + idEvent )
  }

  deleteEvent(id): any {

    this.eventService.deleteEvent(id).toPromise()
      .then(data => {
        this.toastr.clear();
        this.toastr.success('Uspesno obrisao!');
        this.items = this.items.filter(el => el.id != id);
      })
      .catch(err => {
        this.toastr.error("Greska pri brisanju");
      });

  }
  back() {
    const id = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + id)
  }
}
