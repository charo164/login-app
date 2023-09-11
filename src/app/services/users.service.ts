import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_RESPONSE, User } from '../types/api';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public fetching = false;

  constructor(private httpClient: HttpClient) {}

  update(
    id: number,
    body: {
      name: string | null;
      email: string | null;
      bio: string | null;
      phone: string | null;
      password?: string | null;
    }
  ) {
    if (body.password == '') delete body.password;

    this.fetching = true;

    return this.httpClient
      .put<API_RESPONSE<User>>(`${environment.API_URL}/users/${id}`, body)
      .pipe(
        catchError(this.handleError),
        tap(() => (this.fetching = false))
      );
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
