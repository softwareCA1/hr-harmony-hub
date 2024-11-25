// username.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsernameService {
  constructor(private http: HttpClient) { }
  private usernameSubject = new BehaviorSubject<string>('');
  public username$ = this.usernameSubject.asObservable();

  setUsername(username: string): void {
    this.usernameSubject.next(username);
  }

  signup(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/signup', { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/login', { username, password });
  }
  getAllUserNames(): Observable<any> {
    return this.http.get(`http://localhost:3000/getAllUsernames`);
  }

  changePassword(username:string,newPassword: string): Observable<any> {
    const url = `http://localhost:3000/changePass`;
    return this.http.put(url, { newPassword,username });
  }


}
