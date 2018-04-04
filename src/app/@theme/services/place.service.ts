

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

  getPlace(id): Observable<any> {
    return this.http.get(`${this.BASE_URL}/place/${id}` )
  }

  getRepertoriesInPlace (id): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}/repertories` )
  }

  createPlace(place: Place): Observable<any> {
    const body = JSON.stringify(place);
    return this.http.post(`${this.BASE_URL}/place`, body, httpOptions)
      .map(data => data);
  }

}
