
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
};

@Injectable()
export class RepertoryService {

  private BASE_URL = 'http://localhost:8090/api/repertory';

  constructor(private http: HttpClient) {
  }

  getAllProjectionInRepertory (id): Observable<any> {
    return this.http.get(`${this.BASE_URL}/all-projections/${id}` )
  }

  deleteRepertory(id: any): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.delete(`${this.BASE_URL}/repertory/` + id,{ headers: headers});
  }
}
