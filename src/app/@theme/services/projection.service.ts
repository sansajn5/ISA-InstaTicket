import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

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
}
