

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Place} from "../models/place.model";

@Injectable()
export class PlaceService {


  private BASE_URL = 'http://localhost:8090/api/place';

  constructor(private http: HttpClient) {}

  getCinemas(): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.get(`${this.BASE_URL}/cinemas`,{ headers: headers});
  }

  getTheathres(): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.get(`${this.BASE_URL}/theaters`,{ headers: headers});
  }

  getPlace(id): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.get(`${this.BASE_URL}/place/${id}`,{ headers: headers});
  }

  getRepertoriesInPlace (id): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.get(`${this.BASE_URL}/${id}/repertories`,{ headers: headers});
  }

  createPlace(place: Place): Observable<any> {
    const token = localStorage.getItem('token')
    const body = JSON.stringify(place);
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.post(`${this.BASE_URL}/place`, body,{ headers: headers});
  }

  getEventInPlace(id): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.get(`${this.BASE_URL}/${id}/event-in-place`,{ headers: headers});
  }

  deletePlace(id: any): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.delete(`${this.BASE_URL}/place/` + id,{ headers: headers});
  }

  editPlace(id , place: Place): Observable<any> {
    const token = localStorage.getItem('token')
    const body = JSON.stringify(place);
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.put(`${this.BASE_URL}/place/${id}`,{ headers: headers});
  }


}
