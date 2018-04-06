
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
}
