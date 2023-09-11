import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'login-app';

  constructor(public authService: AuthService) {
    this.checkUrlToken();
    authService.getLoggedUser().subscribe();
  }

  checkUrlToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) localStorage.setItem('token', token);
  }
}
