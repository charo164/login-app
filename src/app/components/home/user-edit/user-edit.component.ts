import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/api';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent {
  public user: User | null = this.authService.user;

  public userForm = this.fb.group({
    name: [this.user?.name || '', [Validators.minLength(3)]],
    email: [this.user?.email || '', [Validators.email]],
    bio: [this.user?.bio || '', [Validators.maxLength(255)]],
    phone: [
      this.user?.phone || '',
      [Validators.minLength(9), Validators.maxLength(15)],
    ],
    password: [''],
  });

  constructor(
    private authService: AuthService,
    public usersService: UsersService,
    private fb: FormBuilder
  ) {}

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const data = this.userForm.getRawValue();

    this.usersService.update(this.user?._id || -1, data).subscribe((res) => {
      if (res) {
        console.log(res);
        this.authService.user = res.data;
        this.user = res.data;
        this.userForm.patchValue({
          password: '',
        });
      }
    });
  }

  isChanged(): boolean {
    return (
      this.userForm.get('name')?.value !== this.user?.name ||
      this.userForm.get('email')?.value !== this.user?.email ||
      this.userForm.get('bio')?.value !== this.user?.bio ||
      this.userForm.get('phone')?.value !== (this.user?.phone || '') ||
      this.userForm.get('password')?.value !== ''
    );
  }
}
