import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Projection} from "../models/projection.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
};

@Injectable()
export class ProjectionService {

  private BASE_URL = 'http://localhost:8090/api/projection';

  constructor(private http: HttpClient) {
  }

  getProjection (id): Observable<any> {
    return this.http.get(`${this.BASE_URL}/projection/${id}` )
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
    return this.http.post(`${this.BASE_URL}/${id}/projection`, body , httpOptions).map(data => data);
  }
}
