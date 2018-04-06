import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
};

@Injectable()
export class HallService {

  private BASE_URL = 'http://localhost:8090/api/hall';

  constructor(private http: HttpClient) {
  }

  getHallsInPlace(id): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}/halls-in-place` )
  }
}
