import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  cinema: string;
  cinemaImage: string;
  theatre: string;
  theatreImage: string;
  urlCinema: string;
  urlTheatre: string;
  show:boolean = false;
  flag:boolean = false;
  imageRoute = '../../../assets/images/';

  constructor(protected router: Router
  ) {}
  ngOnInit(): void {
    this.cinema = 'Bioskopi';
    this.theatre = 'Pozorista';
    this.cinemaImage = this.imageRoute + 'cinema.jpg';
    this.theatreImage = this.imageRoute + 'theatre.png';
    this.urlCinema = 'dashboard/pages/place/cinemas';
    this.urlTheatre = 'dashboard/pages/place/theathres';

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

  addPlace() {
    this.router.navigateByUrl('dashboard/pages/place/add/place' );
  }



}
