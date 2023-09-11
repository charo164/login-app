import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/api';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.css'],
})
export class UserInfosComponent {
  public user: User | null = this.authService.user;

  constructor(public authService: AuthService) {}
}
