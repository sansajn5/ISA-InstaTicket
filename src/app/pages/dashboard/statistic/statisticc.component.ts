import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-statistic',
  styleUrls: ['./statisticc.component.scss'],
  templateUrl: './statisticc.component.html',
})
export class StatisticcComponent implements OnInit {

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
    this.urlCinema = 'dashboard/pages/statistic/cinemas';
    this.urlTheatre = 'dashboard/pages/statistic/theathres';
  }

}
