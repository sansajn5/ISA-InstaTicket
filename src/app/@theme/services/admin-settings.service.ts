import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AdminRoleModel} from "../models/adminRole.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
};

@Injectable()
export class AdminSettingsService {


  private BASE_URL = 'http://localhost:8090/api/admin';





  constructor(private http: HttpClient,
              protected router: Router,
              private route: ActivatedRoute) {
  }


  getUsers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/get-users`, httpOptions).map(data => data);
  }

  addSystemAdminRole(id: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/system-admin-role/` + id, httpOptions).map(data => data);
  }

  deleteSystemAdminRole(id: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/delete-system-admin-role/` + id, httpOptions).map(data => data);
  }

  addFanZoneAdminRole(id: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/fanzone-admin-role/` + id, httpOptions).map(data => data);
  }

  deleteFanZoneAdminRole(id: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/delete-fanzone-admin-role/` + id, httpOptions).map(data => data);
  }

  addPlaceAdminRole(adminRole: AdminRoleModel, id: any): Observable<any> {

    const token = localStorage.getItem('token')
    const body = JSON.stringify(adminRole);

    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.post(`${this.BASE_URL}/place-admin-role/` + id, body, { headers: headers}).map(data => data)

  }

  getEmployedPlaceAdmins(id: any): Observable<any> {
    return this.http.get(`${this.BASE_URL}/employed-place-admins/` + id, httpOptions).map(data => data);
  }


  deletePlaceAdminRole(adminRole: AdminRoleModel, id: any): Observable<any> {

    const token = localStorage.getItem('token')
    const body = JSON.stringify(adminRole);

    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.post(`${this.BASE_URL}/delete-place-admin-role/` + id, body, { headers: headers}).map(data => data)

  }

}
