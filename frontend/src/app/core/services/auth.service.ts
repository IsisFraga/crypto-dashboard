import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface LoginResponse {
 access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
 private readonly API_URL = `${environment.apiUrl}/auth`;
 private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

 readonly isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

 constructor(private http: HttpClient) {}

 login(username: string, password: string): Observable<LoginResponse> {
   return this.http.post<LoginResponse>(`${this.API_URL}/login`, { username, password }).pipe(
     tap(response => {
       localStorage.setItem('token', response.access_token);
       this.isAuthenticatedSubject.next(true);
     })
   );
 }

 logout(): void {
   localStorage.removeItem('token');
   this.isAuthenticatedSubject.next(false);
 }

 getToken(): string | null {
   return localStorage.getItem('token');
 }

 private hasToken(): boolean {
   return !!localStorage.getItem('token');
 }
}