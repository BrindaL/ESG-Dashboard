import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EsgDataService {
  private baseURL = 'http://localhost:8080/api/esg/company'

  constructor(private http: HttpClient) { }

  getESGScores(companyName: string): Observable<any> {
    const params = new HttpParams().set("companyName", companyName)
    const link = `${this.baseURL}?${params.toString()}`;
    console.log(link)
    return this.http.get<any>(this.baseURL, { params })
  }
}