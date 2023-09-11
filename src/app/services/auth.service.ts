import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { API_RESPONSE, User } from '../types/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User | null = null;
  public isAuthenticating = true;
  public fetching = false;

  constructor(private httpClient: HttpClient) {}

  getLoggedUser() {
    return this.httpClient
      .get<API_RESPONSE<User>>(`${environment.API_URL}/auth/me`)
      .pipe(
        catchError(this.handleErrorWithoutNotif),
        tap((res) => {
          this.isAuthenticating = false;
          if (res) this.user = res.data;
        })
      );
  }

  login(body: { login: string | null; password: string | null }) {
    this.fetching = true;
    return this.httpClient
      .post<API_RESPONSE<string>>(`${environment.API_URL}/auth/login`, body)
      .pipe(
        catchError(this.handleError),
        tap(() => (this.fetching = false))
      );
  }

  logout() {
    return this.httpClient
      .post<API_RESPONSE<string>>(`${environment.API_URL}/auth/logout`, {})
      .pipe(
        catchError(this.handleErrorWithoutNotif),
        tap(() => {
          localStorage.removeItem('token');
          this.user = null;
        })
      );
  }

  signUp(body: { email: string | null; password: string | null }) {
    const name = `${body.email?.split('@')[0]}#${Math.round(
      Date.now() / 1000
    )}`;
    this.fetching = true;

    return this.httpClient
      .post<API_RESPONSE<string>>(`${environment.API_URL}/auth/signUp`, {
        ...body,
        name,
      })
      .pipe(
        catchError(this.handleError),
        tap(() => (this.fetching = false))
      );
  }

  getGoogleLoginLink() {
    return this.httpClient
      .get<API_RESPONSE<string>>(`${environment.API_URL}/auth/google/loginLink`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    swal.fire({
      title: 'Error',
      text: error.error.message,
      icon: 'error',
    });
    return of(null);
  }

  private handleErrorWithoutNotif(error: HttpErrorResponse) {
    console.log(error);
    return of(null);
  }
}
