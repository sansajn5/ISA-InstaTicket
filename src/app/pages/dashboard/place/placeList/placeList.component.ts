import {Component, EventEmitter, OnInit, Output} from "@angular/core";

import {ActivatedRoute, Router} from "@angular/router";
import {NbSpinnerService} from "@nebular/theme";
import {ToastrService} from "ngx-toastr";
import {PlaceService} from "../../../../@theme/services/place.service";


@Component({
    templateUrl: './placeList.component.html',
    styleUrls: ['./placeList.component.scss'],
})
export class PlaceListComponent implements OnInit {

  items = []
  imageRoute = '../../../assets/images/';
  image: string;
  place: string;

  @Output() refreshList: EventEmitter<any> = new EventEmitter()

  constructor(private placeService: PlaceService,
              protected router: Router,
              private route: ActivatedRoute,
              private spinnerService: NbSpinnerService,
              private toastr: ToastrService
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

  deletePlace (id): any {
    this.placeService.deletePlace(id).toPromise()
      .then(data => {
        this.toastr.clear();
        this.toastr.success('Uspesno obrisan bioskop ili pozoriste!');
        this.items = this.items.filter(el => el.id != id);
      })
      .catch(err => {
      this.toastr.error("Greska pri brisanju");
    });

  }


}
