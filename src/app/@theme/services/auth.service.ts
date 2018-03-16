import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
   * Method POST
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
   * Method GET
   * Invoking server to remove user from session
   */
  logout(): Observable<any> {
    localStorage.clear();
    return null;
  }


}
