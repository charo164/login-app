import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getLoggedUser().pipe(
    map((user) => {
      if (!user) {
        router.navigate(['/auth/login']);
        return false;
      }
      return true;
    })
  );
};

export const authLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getLoggedUser().pipe(
    map((user) => {
      if (user) {
        router.navigate(['/']);
        return false;
      }
      return true;
    })
  );
};
