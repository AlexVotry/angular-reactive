import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from '../model/user';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

// to persist in local storage:
const AUTH_DATA = "auth_data";

@Injectable({
  providedIn: 'root'
})
export class AuthStore {

  private subject = new BehaviorSubject<User>(null);
  user$: Observable<User> = this.subject.asObservable();

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  
  constructor(private http: HttpClient) {
    // take the user$ profile and if exists converts it to true value, if null converts to false.
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
    // stays the opposite of isLoggedIn$
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    const user = localStorage.getItem(AUTH_DATA);

    if (user) this.subject.next(JSON.parse(user));
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login', {email, password})
      .pipe(
        tap(user => {
          this.subject.next(user);
          localStorage.setItem(AUTH_DATA, JSON.stringify(user));
        }),
        shareReplay()
      );
  }

  logout() {
    this.subject.next(null);
    localStorage.removeItem(AUTH_DATA);
  }
}