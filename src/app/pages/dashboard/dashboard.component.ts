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
  }

  addPlace() {
    this.router.navigateByUrl('dashboard/pages/place/add-place' );
  }



}
