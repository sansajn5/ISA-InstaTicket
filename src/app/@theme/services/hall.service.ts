import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Hall} from "../models/hall.model";

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

  createHall(hall: Hall , id): Observable<any> {
    const token = localStorage.getItem('token')
    const body = JSON.stringify(hall);
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.post(`${this.BASE_URL}/hall/${id}`, body,{ headers: headers});
  }

  deleteHall(id: any): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.delete(`${this.BASE_URL}/hall/` + id,{ headers: headers});
  }


  editHall(id , hall: Hall): Observable<any> {
    const token = localStorage.getItem('token')
    const body = JSON.stringify(hall);
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.put(`${this.BASE_URL}/hall/${id}`,{ headers: headers});
  }
}
