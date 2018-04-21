
import {Component, OnInit} from "@angular/core";;
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {PlaceService} from "../../../../@theme/services/place.service";
import {AdminSettingsService} from "../../../../@theme/services/admin-settings.service";
import {AuthService} from "../../../../@theme/services/auth.service";

@Component({

  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss'],
})

export class PlaceComponent implements OnInit {

   nameTitle: string;
   desc: string;
   adr: string;
   rep = []
   items = []
   quickSeats = []
   quick = []
   type: string;
   place: string;

   starRate ;

   show_edit:boolean = false;
   roles: any;
   placeAdmins = []
   currentUser;
  show:boolean = false;
  flag:boolean = false;

  constructor(private placeService: PlaceService,
              protected router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private adminSetings: AdminSettingsService,
              private authService: AuthService
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
      this.rep = data.repertories;
      this.checkDate()
    })

    this.placeService.getVoteForPlace(id).subscribe(data => {
      this.starRate = data.vote;
    })

    this.placeService.getQuickSeats(id).subscribe(data=>{
      this.quick = data.seats;
      this.checkDateQuick()
    })

    this.authService.getAccount().subscribe(data=>{
      this.currentUser = data.id;

      this.adminSetings.getEmployedPlaceAdmins(id).subscribe(data=>{
        this.placeAdmins = data.users;
        for (let admin of this.placeAdmins) {
          if (admin.id == this.currentUser) {
            this.show_edit = true;
          }
        }
      })
    })

    this.roles = localStorage.getItem('role')

    var rolesSliced = this.roles.slice(1, -1);
    var rolesSplited = rolesSliced.split(',');

    for (let role of rolesSplited) {

      if (role.replace(/\s/g, '') === 'SUPER_ADMIN') {
        this.show = true;
        this.flag=true;
      } else if (role.replace(/\s/g, '') !== 'SUPER_ADMIN'&& this.flag === false){
        this.show = false;
      }
    }

  }

  checkDateQuick() {
    let today_date = new Date();
    this.quick.forEach( item => {
      let split = []
      split = item.projection.date.split('-');
      let date =(split[2] + '-' + split[1] + '-' +  split[0]) ;
      let entered_date = new Date(date);
      if (entered_date >= today_date) {
        this.quickSeats.push(item)
      }
    })
  }

  checkDate() {
    let today_date = new Date();
    this.rep.forEach( item => {
      let split = []
      split = item.date.split('-');
      let date =(split[2] + '-' + split[1] + '-' +  split[0]) ;
      let entered_date = new Date(date);
      if (entered_date >= today_date) {
          this.items.push(item)
      }
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

  back () {
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/pages/place/' + place )
  }

  quickReservation(id) {
    this.placeService.quickReservation(id).toPromise()
      .then(data => {
        this.toastr.clear();
        this.toastr.success('Uspesno obavljena rezervacija!');
        this.quickSeats = this.quickSeats.filter(el => el.id != id);
      })
  }

  deletePlace (): any {
    const idPlace = this.route.snapshot.params.id;
    this.placeService.deletePlace(idPlace).toPromise()
      .then(data => {
        this.toastr.clear();
        this.toastr.success('Uspesno obrisan bioskop ili pozoriste!');
        const place = this.route.snapshot.params.place;
        this.router.navigateByUrl('dashboard/pages/place/' + place)

      })
      .catch(err => {
        this.toastr.error("Morate ukloniti administratore da bi obrisali bioskop/pozoriste");
      });

  }

  editPlace() {
    const place = this.route.snapshot.params.place;
    const idPlace = this.route.snapshot.params.id;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/edit/place/'  + idPlace)
  }
}
