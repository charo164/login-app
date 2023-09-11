import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  public loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.invalid) return;

    const data = this.loginForm.getRawValue();

    this.authService.login(data).subscribe((res) => {
      if (res) {
        localStorage.setItem('token', res.data);
        this.router.navigate(['/']);
      }
    });
  }
}
