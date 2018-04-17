import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {VoteForEventService} from "../../../@theme/services/vote-for-event.service";
import {VoteEventModel} from "../../../@theme/models/voteEvent.model";
import {EventService} from "../../../@theme/services/event.service";
import {ProjectionService} from "../../../@theme/services/projection.service";

@Component({
  selector: 'ngx-vote-event',
  templateUrl: './voteEvent.component.html',
})
export class VoteEventComponent implements OnInit {

  nameEvent: string;
  placeName: string;
  date: string;
  startTime: string;
  endTime: string;
  starRate;
  isVote: boolean;

  constructor(private route: ActivatedRoute,
              private projectionService: ProjectionService,
              private router: Router,
              private voteEventService: VoteForEventService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    const idProjection = this.route.snapshot.params.id;
    const idEvent = this.route.snapshot.params.idEvent;

    this.voteEventService.checkIfVoteed(idEvent).subscribe(data => {
      this.isVote = data.checkVote;
    })

    this.projectionService.getProjection(idProjection).subscribe(data => {
      this.nameEvent = data.projection.event.name;
      this.placeName = data.projection.event.place.name;
      this.date = data.projection.date;
      this.startTime = data.projection.startTime;
      this.endTime = data.projection.endTime;
    })

  }

  back() {
    const username = this.route.snapshot.params.username
    this.router.navigateByUrl('dashboard/user/profile/' + username);
  }

  createVote(): any {
    const vote = new VoteEventModel(
      this.starRate,
      this.nameEvent,
      this.placeName,
    );
    this.voteEventService.createVote(vote).toPromise()
      .then(data => {
        this.toastr.clear();
        this.toastr.success('Uspesno glasanje!');
        const username = this.route.snapshot.params.username
        this.router.navigateByUrl('dashboard/user/profile/' + username  );
      })
  }
}
