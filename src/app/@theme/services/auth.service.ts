import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { User } from '../models/user.model';
import {RequestPassword} from "../models/RequestPassword";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
};

@Injectable()
export class AuthService {

  private BASE_URL = 'http://localhost:8090/api/auth';

  constructor(private http: HttpClient) {}


  /**
   * Method /POST
   * Providing server with user's login credential
   * @param {User} user object with credential
   * @returns {Observable<any>} jwt token and user object
   */
  signIn(user: User): Observable<any> {
    const body = JSON.stringify(user);
    return this.http.post(this.BASE_URL + '/authenticate', body, httpOptions)
  }

  /**
   * Method /POST
   * Providing server with user's data for registration
   * @param {User} user
   * @returns {Observable<any>} response from server side
   */
  signUp(user: User): Observable<any> {
    const body = JSON.stringify(user);
    return this.http.post(`${this.BASE_URL}/sign-up`, body, httpOptions)
  }

  activeAccount(key: string): Observable<any> {
    const params = new HttpParams().set('key', key);
    return this.http.get(`${this.BASE_URL}/activate`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
      params,
    })
  }

  /**
   * Method /GET
   * Invoking server to remove user from session
   */
  logout(): void {
    this.http.get(`${this.BASE_URL}/logout`, httpOptions)
    localStorage.clear();
  }

  requestPassword(requestPassword: RequestPassword): Observable<any> {
    const body = JSON.stringify(requestPassword);
    return this.http.post(`${this.BASE_URL}/request-password`, body, httpOptions)
  }

  changedRole(pw, pw1) {
    const body = JSON.stringify({password: pw, repassword: pw1, username:localStorage.getItem('user')});
    localStorage.clear();
    return this.http.put(`${this.BASE_URL}/changepassword`,body,httpOptions);
  }


  getAccount(): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.get(`${this.BASE_URL}/account` ,{ headers: headers})
  }

}
