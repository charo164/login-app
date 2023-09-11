import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.css'],
})
export class SocialAuthComponent {
  constructor(private authService: AuthService) {}

  loginWithGoogle() {
    this.authService.getGoogleLoginLink().subscribe((res) => {
      if (res) {
        window.location.href = res.data;
      }
    });
  }
}
