import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public showHeaderDropdown = false;

  constructor(public authService: AuthService, private router: Router) {}

  public logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  public toggleHeaderDropdown(): void {
    this.showHeaderDropdown = !this.showHeaderDropdown;
  }
}
