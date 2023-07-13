
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { interval, mergeMap, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatahubService {
  baseURL: string = 'https://fakedh.azurewebsites.net/api/v1';
 
  constructor(private http: HttpClient) {}
 
  getData(assetId: string): Observable<any> {
    return interval(2500).pipe(
      mergeMap(() => this.http.get(this.baseURL + '/data' + '?asset=' + assetId)));
  }
  
}
