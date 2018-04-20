
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectionService} from "../../../../@theme/services/projection.service";
import { NbSpinnerService } from '@nebular/theme';
import { UserProfileService } from '../../../../@theme/services/user-profile.service';

@Component({
  templateUrl: './projection.component.html',
  styleUrls: ['./projection.component.scss'],
})

export class ProjectionComponent implements OnInit {

  item: any;
  event: string;

  actors: string;
  type: string;
  director: string;
  duration: string;
  description: string;
  hall: string;
  startTime: string;
  endTime: string;
  date: string;
  regularPrice: string;
  vipPrice: string;
  quickPrice: string;
  starRate;
  imageRoute = '../../../assets/images/';
  image: string;
  public fullGrid = [];
  public row = 0;
  public colum = 0;
  public showClassicSeats = false;
  public counter;
  public callFriends = false;
  public showQuestion = false;
  public friends = [];
  public showFriends = false;
  public id;
  public idPro;

  constructor (protected router: Router,
               private projecionService: ProjectionService,
               private route: ActivatedRoute,
              private spinnerService: NbSpinnerService,
              private userProfileService: UserProfileService) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    const idProjection = this.route.snapshot.params.idProjection;

    this.projecionService.getProjection(idProjection).subscribe(data => {
      this.item = data.projection;
      this.event = data.projection.event.name;
      this.director = data.projection.event.director;
      this.actors = data.projection.event.actors;
      this.type = data.projection.event.type;
      this.duration = data.projection.event.duration;
      this.description = data.projection.event.description;
      this.hall = data.projection.hall.name;
      this.startTime = data.projection.startTime;
      this.endTime = data.projection.endTime;
      this.date = data.projection.date;
      this.regularPrice = data.regularPrice 
      this.vipPrice = data.projection.vipPrice
      this.quickPrice = data.projection.quickTicketPrice;
      this.image = this.imageRoute + 'm.jpg';
      const hall = data.projection.hall;
      this.fullGrid = data.seats;
      this.row = data.projection.hall.row;
      this.colum = data.projection.hall.col;
      this.showClassicSeats = true;
      this.id = this.route.snapshot.params.id;
      this.idPro = this.route.snapshot.params.idProjection;
      this.projecionService.getVoteForEvent(idProjection).subscribe(data => {
        this.starRate = data.vote;
      })
    })



  }
  back() {
    const id = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;
    const repertory = this.route.snapshot.params.idRepertory;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + id + '/repertory/' + repertory
    + '/projections');
  }

  onReserve(event) {
    this.counter = event.field2;
    if(this.counter > 1) {
      this.showQuestion = true;
      this.setFriends();
    }
  }

  showFriendsList() {
    this.showFriends = true;
  }


  setFriends() {
    const current = localStorage.getItem('user');
    this.spinnerService.registerLoader(this.userProfileService.getProfileFriends(current).toPromise().then(data => {
      this.friends = data.friends;
      
    }))
    this.spinnerService.load();
  }

  reserve() {
    let arrayOfFriends = [];
    let arrayOfSeats = [];
    this.fullGrid.forEach( el => {
      const seat = {
          cordX: el.cordX,
          cordY: el.cordY,
          isSeat: el.isSeat,
          type: el.state
      }
      arrayOfSeats.push(seat);
  })
    const seats = arrayOfSeats;
    if(localStorage.getItem('inv'))
      arrayOfFriends = JSON.parse(localStorage.getItem('inv'));
    this.projecionService.reserveTickets(arrayOfFriends,seats,this.idPro,this.id).toPromise().then(data => {
      console.log(data);
    })
  }

  addFriendToList(email) {
    let array = [];
    if(localStorage.getItem('inv')){
      array = JSON.parse(localStorage.getItem('inv'));
      array.push(email);
      localStorage.setItem('inv',JSON.stringify(array));
    } else {
      array.push(email);
      localStorage.setItem('inv', JSON.stringify(array));
    }
  }
}
