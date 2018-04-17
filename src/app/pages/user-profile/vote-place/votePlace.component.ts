
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaceService} from '../../../@theme/services/place.service';
import {VotePlaceModel} from '../../../@theme/models/votePlace.model';
import {VoteForPlaceService} from '../../../@theme/services/vote-for-place.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'ngx-vote-place',
  templateUrl: './votePlace.component.html',
})
export class VotePlaceComponent implements OnInit {

  namePlace: string;
  type: string;
  starRate;
  isVote: boolean;

  constructor(private route: ActivatedRoute,
              private placeService: PlaceService,
              private router: Router,
              private votePlaceService: VoteForPlaceService,
              private toastr: ToastrService,) {
  }

  ngOnInit() {
    const idPlace = this.route.snapshot.params.id;

    this.votePlaceService.checkIfVoteed(idPlace).subscribe(data => {
      this.isVote = data.checkVote;
    })

    this.placeService.getPlace(idPlace).subscribe(data => {
      this.namePlace = data.place.name;
      this.type = data.place.type;
    })

  }

  back() {
    const username = this.route.snapshot.params.username
    this.router.navigateByUrl('dashboard/user/profile/' + username);
  }

  createVote(): any {
    const vote = new VotePlaceModel(
      this.starRate,
      this.namePlace,
    );
    this.votePlaceService.createVote(vote).toPromise()
      .then(data => {
        this.toastr.clear();
        this.toastr.success('Uspesno glasanje!');
        const username = this.route.snapshot.params.username
        this.router.navigateByUrl('dashboard/user/profile/' + username  );
      })
  }
}
