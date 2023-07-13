
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatahubService {
  baseURL: string = 'https://fakedh.azurewebsites.net/api/v1';
 
  constructor(private http: HttpClient) {}
 
  getData(assetId: string): Observable<any> {
    return this.http.get(this.baseURL + '/data' + '?asset=' + assetId);
  }
}
