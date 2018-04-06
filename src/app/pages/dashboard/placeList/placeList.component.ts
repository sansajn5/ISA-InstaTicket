import {Component, OnInit} from "@angular/core";
import {PlaceService} from "../../../@theme/services/place.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NbSpinnerService} from "@nebular/theme";

@Component({
    templateUrl: './placeList.component.html',
    styleUrls: ['./placeList.component.scss'],
})
export class PlaceListComponent implements OnInit {

  items = []
  imageRoute = '../../../assets/images/';
  image: string;
  place: string;

  constructor(private placeService: PlaceService,
              protected router: Router,
              private route: ActivatedRoute,
              private spinnerService: NbSpinnerService,
  ) {}

  ngOnInit() {
      this.place = this.route.snapshot.params.place;
      this.place === 'cinemas' ? this.setCinemas() : this.setTheathres();
  }

  setCinemas() {
    this.spinnerService.registerLoader(this.placeService.getCinemas().toPromise()
      .then( data => {
        this.items = data.cinemas;
        this.image = this.imageRoute + 'cinema.jpg';
      }))
    this.spinnerService.load();
  }

  setTheathres() {
    this.spinnerService.registerLoader(this.placeService.getTheathres().toPromise()
      .then( data => {
         this.items = data.theaters;
         this.image = this.imageRoute + 'theatre.png';
      }))
    this.spinnerService.load();
  }


}
