import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.invalid) return;

    const data = this.loginForm.getRawValue();

    this.authService.signUp(data).subscribe((res) => {
      if (res) {
        localStorage.setItem('token', res.data);
        this.router.navigate(['/']);
      }
    });
  }
}
