import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { User } from "../models/user.model";
import { Router } from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
};

@Injectable()
export class AuthService {

  private BASE_URL = 'http://localhost:8090/api/auth';

  constructor(private http: HttpClient,private router: Router) {}


  /**
   * Method /POST
   * Providing server with user's login credential
   * @param {User} user object with credential
   * @returns {Observable<any>} jwt token and user object
   */
  signIn(user: User): Observable<any> {
    const body = JSON.stringify(user);
    return this.http.post(this.BASE_URL + '/authenticate', body, httpOptions)
      .map( data => data);
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
      .map(data => data);
  }

  activeAccount(key: string): Observable<any> {
    const params = new HttpParams().set('key',key);
    return this.http.get(`${this.BASE_URL}/activate`,{
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
      params
    })
    .map(data => data);
  }

  /**
   * Method /GET
   * Invoking server to remove user from session
   */
  logout(): Observable<any> {
    localStorage.clear();
    return null;
  }


}
