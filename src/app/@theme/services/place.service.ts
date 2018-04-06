

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

  getEventInPlace(id): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}/event-in-place` )
  }

  createPlace(place: Place): Observable<any> {
    const body = JSON.stringify(place);
    return this.http.post(`${this.BASE_URL}/place`, body, httpOptions)
      .map(data => data);
  }

  deletePlace(id: any): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/place/` + id, httpOptions)
      .map(data => data);
  }

}
