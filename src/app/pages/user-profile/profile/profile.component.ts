import { Component, OnInit } from '@angular/core';
import { NbSpinnerService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../../../@theme/services/user-profile.service';
import { User } from '../../../@theme/models/user.model';
import { ToastrService } from 'ngx-toastr';
import {ReservationService} from "../../../@theme/services/reservation.service";

@Component({
    selector: 'ngx-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

    public profile: string;
    public profileImage: string;
    public profileUser = new User('','','','','','','','','');
    public isMyAccount: boolean;

    public friends: any[];
    public recentVisitis: any[];
    public requests: any[];
    public requestsForEvents: any[];

    public points;

    active = []
    reservations = []

    constructor(private spinnerService: NbSpinnerService,
                private router: Router,
                private route: ActivatedRoute,
                private userProfileService: UserProfileService,
                private toastr: ToastrService,
                private reservationService: ReservationService) {

        route.params.subscribe(param => {
            this.profile = param.username;
            const currentUser = localStorage.getItem('user');
            this.isMyAccount = (this.profile === currentUser) ? true : false;
            this.setProfileData();
            this.setFriendList();
        });

    }

    setProfileData() {
        if(this.isMyAccount) {
            this.spinnerService.registerLoader(this.userProfileService.getProfileInfo(null).toPromise()
                .then(data => {
                    this.profileUser = new User(data.username, null , null, data.firstName, data.lastName, data.email, data.city, data.address, data.number);
                    this.points = data.points;
            }));
            this.spinnerService.load();

            this.checkFriendRequestList();
            this.profileImage = '../../../../assets/images/alan.png'
        } else {
            this.spinnerService.registerLoader(this.userProfileService.getProfileInfo(this.profile).toPromise()
                .then(data => {
                    this.profileUser = new User(data.username, null , null, data.firstName, data.lastName, data.email, data.city, data.address, data.number);
            }));
            this.spinnerService.load();

            this.recentVisitis = [

            ]
            this.profileImage = '../../../../assets/images/alan.png'
        }
    }

    setFriendList() {
        if(this.isMyAccount) {
            this.spinnerService.registerLoader(this.userProfileService.getProfileFriends(null).toPromise()
                .then(data => {
                    this.friends = data.friends;
            }));
            this.spinnerService.load();
        } else {
            this.spinnerService.registerLoader(this.userProfileService.getProfileFriends(this.profile).toPromise()
                .then(data => {
                    this.friends = data.friends;
            }));
            this.spinnerService.load();
        }
    }

    addFriend(email) {
        this.userProfileService.sendFriendRequest(email).toPromise().then(() => {
            this.toastr.info('You have sent friend request', 'Info');
        }).catch(error => {
            this.toastr.error('Please try again in few seconds','Server error');
        })
    }

    checkFriendRequestList() {
        this.userProfileService.getFriendRequests().toPromise().then((data) => {
            this.requests = data.requests;
        })
    }

    editAccount() {
        const user = new User('','','',this.profileUser.firstName,this.profileUser.lastName,this.profileUser.email,this.profileUser.city,this.profileUser.address,this.profileUser.number);
        this.userProfileService.updateBasicProfileData(user).toPromise().then(() =>{
            this.toastr.success('Account information has been updated', 'Info');
        }).catch(error => {
            this.toastr.error('Please try again in few seconds','Server error');
        })
    }

    acceptFriendRequest(email) {
        this.userProfileService.acceptFriendRequest(email).toPromise().then(() => {
            this.toastr.info('You have accepted friend request', 'Info');
            this.setFriendList();
            this.checkFriendRequestList();
        }).catch(error => {
            this.toastr.error('Please try again in few seconds','Server error');
        })
    }

    ngOnInit() {
      this.setUserActiveReservation();
      this.setUserReservation();
      this.setReservationInvitations();
    }


  setUserReservation() {
    this.reservationService.getUserReservation().subscribe(data => {
        this.reservations = data.reservations;
      })
  }

  setUserActiveReservation() {
    this.reservationService.getUserActiveReservation().subscribe(data => {
        this.active = data.reservations;
      })
  }

  voteForPlace(id) {
      const username = this.route.snapshot.params.username
      this.router.navigateByUrl('dashboard/user/profile/' + username + '/vote-for-place/' + id );
  }

  voteForEvent(id , idEvent) {
    const username = this.route.snapshot.params.username
    this.router.navigateByUrl('dashboard/user/profile/' + username + '/vote-for-event/' + id +
    '/event/' + idEvent);
  }

  setReservationInvitations() {
      this.userProfileService.getMyReservationInvitation().toPromise().then(data => {
          this.requestsForEvents = data.reservationInvList;
      })
  }
  
  acceptReservationInvitation(id) {
    this.userProfileService.acceptReservationInvitation(id).toPromise().then(data => {
        this.setReservationInvitations();
        this.setUserActiveReservation();
        this.setUserReservation();
    })
  }

  declineReservationInvitation(id) {
    this.userProfileService.declineReservationInvitation(id).toPromise().then(data => {
        this.setReservationInvitations();
    })
  }

  deleteActiveReservation(id) {
      this.userProfileService.dropOutReservation(id).toPromise().then(data => {
        this.setUserActiveReservation();
    })
  }


}
