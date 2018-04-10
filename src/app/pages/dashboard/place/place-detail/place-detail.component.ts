
import {Component, OnInit} from "@angular/core";;
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {PlaceService} from "../../../../@theme/services/place.service";

@Component({

  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss'],
})

export class PlaceComponent implements OnInit {

   nameTitle: string;
   desc: string;
   adr: string;
   items = []
   type: string;
   place: string;

   starRate ;

  constructor(private placeService: PlaceService,
              protected router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService
  ) {}


  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.place = this.route.snapshot.params.place;
    if (this.place === 'cinemas') {
      this.type = 'Filmovi';
    } else {
      this.type = 'Predstave';
    }
    this.placeService.getPlace(id).subscribe(data  => {

      this.nameTitle = data.place.name;
      this.desc = data.place.descripton;
      this.adr = data.place.address;
    })

    this.placeService.getRepertoriesInPlace(id).subscribe(data => {
      this.items = data.repertories;
    })

    this.placeService.getVoteForPlace(id).subscribe(data => {
      this.starRate = data.vote;
    })

  }

  getEvents() {
    const id = this.route.snapshot.params.id;
    this.router.navigateByUrl('dashboard/pages/place/' + this.place + '/place/' + id + '/events');
  }

  getHalls() {
    const id = this.route.snapshot.params.id;
    this.router.navigateByUrl('dashboard/pages/place/' + this.place + '/place/' + id + '/halls');
  }

  getProjections(id) {
    const idPlace = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + idPlace + '/repertory/' + id
      + '/projections');
  }

  getRepertories() {
    const id = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + id + '/repertories-in-place-detail')
  }

  getStatistic() {
    const id = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/' + place + '/place-detail/' + id + '/statistic')
  }

  back () {
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/pages/place/' + place )
  }
}
