

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Place} from "../models/place.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
};

@Injectable()
export class PlaceService {

  private BASE_URL = 'http://localhost:8090/api/place';

  constructor(private http: HttpClient) {}

  getCinemas(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/cinemas`)
  }

  getTheathres(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/theaters`)
  }

  getPlace(id): Observable<any> {
    return this.http.get(`${this.BASE_URL}/place/${id}` )
  }

  getRepertoriesInPlace (id): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}/repertories` )
  }

  createPlace(place: Place): Observable<any> {
    const token = localStorage.getItem('token')
    const body = JSON.stringify(place);
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.post(`${this.BASE_URL}/place`, body, { headers: headers})
  }

  getEventInPlace(id): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}/event-in-place` )
  }

  editPlace(id , place: Place): Observable<any> {
    const token = localStorage.getItem('token')
    const body = JSON.stringify(place);
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.put(`${this.BASE_URL}/place/${id}`, body,{ headers: headers});
  }

  getVoteForPlace(id): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.get(`${this.BASE_URL}/${id}/vote`,{ headers: headers});
  }

  deletePlace(id: any): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.delete(`${this.BASE_URL}/place/` + id,{ headers: headers});
  }
}
