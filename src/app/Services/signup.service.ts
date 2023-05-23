import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http: HttpClient) { }
  signUp(form: any) {
    return this.http.post<any>(`${environment.baseAPI}signUpUsers`, form)
  }
}
