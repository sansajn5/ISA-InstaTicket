
import {Component, OnInit} from "@angular/core";
import {PlaceService} from "../../../@theme/services/place.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({

  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
})

export class PlaceComponent implements OnInit {

   nameTitle: string;
   desc: string;
   adr: string;
   items = []
   type: string;
   place: string;

  constructor(private placeService: PlaceService,
              protected router: Router, private route: ActivatedRoute
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
      this.desc = data.place.description;
      this.adr = data.place.address;
    })

    this.placeService.getRepertoriesInPlace(id).subscribe(data => {
      this.items = data.repertories;
    })

  }

  getEvents() {
    const id = this.route.snapshot.params.id;
    this.router.navigateByUrl('dashboard/' + this.place + '/place/' + id + '/events');
  }

  getHalls() {
    const id = this.route.snapshot.params.id;
    this.router.navigateByUrl('dashboard/place/' + id + '/halls');
  }

  getProjections(id) {
    this.router.navigateByUrl('dashboard/place/repertory/' + id);
  }
}
