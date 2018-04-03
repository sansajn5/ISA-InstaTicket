

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

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

}
