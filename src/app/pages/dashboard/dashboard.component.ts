import { Component, OnInit } from '@angular/core';

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

  imageRoute = '../../../assets/images/';

  ngOnInit(): void {
    this.cinema = 'Bioskopi';
    this.theatre = 'Pozorista'
    this.cinemaImage = this.imageRoute + 'cinema.jpg';
    this.theatreImage = this.imageRoute + 'theatre.png';
  }




}
