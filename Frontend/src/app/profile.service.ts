import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:5000/api/profile';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.put(this.apiUrl, profileData);
  }
}
