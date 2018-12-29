import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Projection} from "../models/projection.model";



@Injectable()
export class ProjectionService {

  private BASE_URL = 'http://localhost:8090/api/projection';
  private RESERVATION_URL = 'http://localhost:8090/api/reservation';

  constructor(private http: HttpClient) {
  }

  getProjection (id): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.get(`${this.BASE_URL}/projection/${id}` ,{ headers: headers})
  }

  deleteProjection(id: any): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.delete(`${this.BASE_URL}/projection/` + id,{ headers: headers});
  }

  createProjection(projection: Projection , id): Observable<any> {
    const token = localStorage.getItem('token')
    const body = JSON.stringify(projection);
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.post(`${this.BASE_URL}/${id}/projection`, body , { headers: headers})
  }

  getVoteForEvent(id): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.get(`${this.BASE_URL}/${id}/vote`,{ headers: headers});
  }

  editProjection(projection: Projection , id, projectionId: string): Observable<any> {
    const token = localStorage.getItem('token')
    const body = JSON.stringify(projection);
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.post(`${this.BASE_URL}/${id}/projection/${projectionId}`, body , { headers: headers})
  }

  reserveTickets(friends,seats,projectionId,id) {
    const token = localStorage.getItem('token')
    const body = JSON.stringify({invatations: friends, seats: seats});
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.post(`${this.RESERVATION_URL}/${id}/projection/${projectionId}/reserve`, body , { headers: headers})
  }
}
