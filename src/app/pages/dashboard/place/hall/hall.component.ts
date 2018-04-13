
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NbSpinnerService} from "@nebular/theme";
import {HallService} from "../../../../@theme/services/hall.service";

@Component({

  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss'],

})

export class HallComponent implements OnInit {
  items = []

  constructor(private hallService: HallService,
              protected router: Router,
              private route: ActivatedRoute,
              private spinnerService: NbSpinnerService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.hallService.getHallsInPlace(id).subscribe(data => {
      this.items = data.halls;
    })

  }

  openFormAddHall() {
    const id = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + id + '/add/hall')
  }

  deleteHall(id): any {

    this.hallService.deleteHall(id).toPromise()
      .then(data => {
        this.toastr.clear();
        this.toastr.success('Uspesno obrisao!');
        this.items = this.items.filter(el => el.id != id);
      })
      .catch(err => {
        this.toastr.error("Greska pri brisanju");
      });

  }

  editHall(id) {
    const idPlace = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + idPlace + '/edit/hall/'+id)
  }

  back() {
    const id = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + id )
  }
}
