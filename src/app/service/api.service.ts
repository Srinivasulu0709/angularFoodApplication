import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


    apiUrl = 'http://127.0.0.1:3000/api/v1/users';
  apiUrlCountry = 'https://countriesnow.space/api/v0.1/countries/states';

  constructor(private http:HttpClient,private jwtHelper:JwtHelperService,private router:Router) { }


  fetchCountryList():Observable<any> {
    return this.http.get(this.apiUrlCountry);
  }

  fetchData():Observable<any> {
   return this.http.get(this.apiUrl)
  }

  createData(userData:User):Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`,userData)
  }

  userLogin(userData:User):Observable<any> {
    return this.http.post<{token:string}>(`${this.apiUrl}/login`,userData)
  }

  isLoggedIn():boolean {
    return !!localStorage.getItem('jwtToken')
  }

  getToken():string | null {
    return localStorage.getItem('jwtToken')
  }
  isTokenExpired() {
    const token = this.getToken();
    return token ? this.jwtHelper.isTokenExpired(token) : null;
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }


  
}
