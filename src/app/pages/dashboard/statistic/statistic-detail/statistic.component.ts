import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PlaceService} from "../../../../@theme/services/place.service";
import {NbSpinnerService} from "@nebular/theme";
import {ToastrService} from "ngx-toastr";
import {EventService} from "../../../../@theme/services/event.service";

@Component({
  selector: 'ngx-statisitic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})

export class StatisticComponent implements OnInit{

  public raiting = true;
  type: string;
  place: string;
  event: string;
  typePlace: string;
  typeEvent: string;
  public choosePlace= false;
  choosePlaceName: string;
  items = []
  events = []
  starRate;

  constructor (private route: ActivatedRoute,
               private placeService: PlaceService,
               private spinnerService: NbSpinnerService,
               private toastr: ToastrService,
               protected router: Router,
               private eventService: EventService ) {

  }

  ngOnInit() {
    this.place = this.route.snapshot.params.place;
    if (this.place === 'cinemas') {
      this.type = ' bioskopa';
      this.typePlace = 'Bioskop';
      this.event = 'filmove' ;
      this.typeEvent ='Film';
    } else {
      this.type = ' pozorista';
      this.typePlace = 'Pozoriste';
      this.event = 'predstave' ;
      this.typeEvent ='Predstava';
    }

    this.place = this.route.snapshot.params.place;
    this.place === 'cinemas' ? this.setCinemas() : this.setTheathres();
  }

  setCinemas() {
    this.spinnerService.registerLoader(this.placeService.getCinemas().toPromise()
      .then( data => {
        this.items = data.cinemas;
      }))
    this.spinnerService.load();
  }

  setTheathres() {
    this.spinnerService.registerLoader(this.placeService.getTheathres().toPromise()
      .then( data => {
        this.items = data.theaters;
      }))
    this.spinnerService.load();
  }


  showRaiting() {
    this.raiting = true;
  }

  back() {
    this.router.navigateByUrl('dashboard/pages/statistic')
  }

  getAllEvent(id , name) {
    this.placeService.getEventInPlace(id).subscribe(data => {
      this.events = data.events;
    })
    this.choosePlace = true;
    this.choosePlaceName = name

  }

  exit() {
  this.choosePlace = false;
  }

  showAttendance(id) {
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/pages/statistic/' + place + '/' + id + '/attendence')
  }

  showInCome(id) {
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/pages/statistic/' + place + '/' + id + '/in-come')
  }

}
