import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor() {}

  success(message: string, title = 'Success') {
    swal.fire({
      title,
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  error(message: string, title = 'Error') {
    console.log(message)
    swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  warning(message: string, title = 'Warning') {
    swal.fire({
      title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'OK',
    });
  }
}
