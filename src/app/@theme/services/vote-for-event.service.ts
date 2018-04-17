import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {VoteEventModel} from "../models/voteEvent.model";

@Injectable()
export class VoteForEventService {

  private BASE_URL = 'http://localhost:8090/api/vote-for-event';

  constructor(private http: HttpClient) {
  }

  createVote(voteEvent: VoteEventModel): Observable<any> {
    const token = localStorage.getItem('token')
    const body = JSON.stringify(voteEvent);
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.post(`${this.BASE_URL}/vote`, body, { headers: headers})
  }

  checkIfVoteed(id): Observable<any>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.get(`${this.BASE_URL}/check-vote/${id}`,{ headers: headers});
  }

}
