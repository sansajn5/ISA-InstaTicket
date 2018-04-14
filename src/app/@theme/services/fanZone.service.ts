import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EventEmitter, Injectable, Output} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Item} from "../models/item.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Offer} from "../models/offer.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
};

@Injectable()
export class FanZoneService {


  private BASE_URL = 'http://localhost:8090/api/fanzone';

  private id: any;

  constructor(private http: HttpClient,
              protected router: Router,
              private route: ActivatedRoute) {}

  getItems(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/items`)
  }

  addNewItem(item: Item): Observable<any>{

    const body = JSON.stringify(item);

    return this.http.post(`${this.BASE_URL}/new-item`, body, httpOptions).map(data => data);
  }

  deleteItem(id: any): Observable<any> {

    //const body = JSON.stringify(item);

    return this.http.delete(`${this.BASE_URL}/delete-item/`+ id, httpOptions).map(data => data);
  }


  getItemData(id: any): Observable<any> {

    return this.http.get(`${this.BASE_URL}/item/`+ id, httpOptions).map(data => data);
  }


  editItem(item: Item, id: any): Observable<any> {

    const body = JSON.stringify(item);

    return this.http.put(`${this.BASE_URL}/edit-item/` + id, body, httpOptions).map(data => data)

  }


  addOffer(offer: Offer): Observable<any> {

    const body = JSON.stringify(offer);

    return this.http.post(`${this.BASE_URL}/new-offer`, body, httpOptions).map(data => data);
  }


  getOffersRequests(): Observable<any> {

    return this.http.get(`${this.BASE_URL}/get-offers-requests`)
  }


  acceptOfferRequest(id: any): Observable<any> {

    return this.http.put(`${this.BASE_URL}/accept-offers-requests/`+ id, httpOptions).map(data => data);
  }


  deleteOffer(id: any): Observable<any> {

    //const body = JSON.stringify(item);

    return this.http.delete(`${this.BASE_URL}/delete-offer/`+ id, httpOptions).map(data => data);
  }




}
