import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
};

@Injectable()
export class ReservationService {

  private BASE_URL = 'http://localhost:8090/api/reservation';

  constructor(private http: HttpClient) {
  }

  getUserReservation(): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.get(`${this.BASE_URL}/my-reservations`,{ headers: headers});
  }

  getUserActiveReservation(): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.get(`${this.BASE_URL}/active/my-reservations`,{ headers: headers});
  }

}
