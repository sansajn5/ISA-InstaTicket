
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {EventModel} from "../models/event.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
};

@Injectable()
export class EventService {

  private BASE_URL = 'http://localhost:8090/api/event';

  constructor(private http: HttpClient) {
  }

  createEvent(event: EventModel , id): Observable<any> {
    const token = localStorage.getItem('token')
    const body = JSON.stringify(event);
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.post(`${this.BASE_URL}/event/${id}`, body,{ headers: headers});
  }

  deleteEvent(id: any): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.delete(`${this.BASE_URL}/event/` + id,{ headers: headers});
  }

  editEvent(id , event: EventModel): Observable<any> {
    const token = localStorage.getItem('token')
    const body = JSON.stringify(event);
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.put(`${this.BASE_URL}/event/${id}`, body ,{ headers: headers});
  }

  getEvent(id): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.get(`${this.BASE_URL}/event/${id}`,{ headers: headers});
  }


}
