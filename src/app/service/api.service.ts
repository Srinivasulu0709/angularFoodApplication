import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private apiUrl = 'http://127.0.0.1:3000/api/v1/users';

  constructor(private http:HttpClient) { }

  fetchData():Observable<any> {
   return this.http.get(this.apiUrl)
  }

  createData(userData:User):Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`,userData)
  }

}
