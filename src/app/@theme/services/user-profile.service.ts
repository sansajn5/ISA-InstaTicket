import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class UserProfileService {

    private BASE_URL = 'http://localhost:8090/api';

    constructor(private http: HttpClient) {}
  
    getProfileInfo(current): Observable<any> {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
        if(current === null) {
            return this.http.get(`${this.BASE_URL}/auth/account`,  { headers: headers });
        } else {
            return this.http.get(`${this.BASE_URL}/user/profile?show=${current}`, { headers: headers });
        }
    }

    getProfileFriends(current): Observable<any> {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
        if(current === null) {
            return this.http.get(`${this.BASE_URL}/user/my-friends`,  { headers: headers });
        } else {
            return this.http.get(`${this.BASE_URL}/user/profile-friends?show=${current}`, { headers: headers });
        }
    }

    sendFriendRequest(email: string): Observable<any> {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
        const body = JSON.stringify({email: email});
        return this.http.post(`${this.BASE_URL}/user/send-friend-request`, body, { headers: headers });
    }

    getFriendRequests(): Observable<any> {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
        return this.http.get(`${this.BASE_URL}/user/get-friend-requests`, { headers: headers });
    }

    updateBasicProfileData(user: User): Observable<any> {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
        const body = JSON.stringify(user);
        return this.http.put(`${this.BASE_URL}/auth/edit-account`, body, { headers: headers });
    }

    acceptFriendRequest(email: String): Observable<any> {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
        const body = JSON.stringify({email: email});
        return this.http.post(`${this.BASE_URL}/user/accept-friend-request`, body, { headers: headers });
    }

    getMyReservationInvitation(): Observable<any> {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': token });
        return this.http.get(`${this.BASE_URL}/user/get-reservation-invitations`, { headers: headers });
    }
    
}
