import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../../services/token-auth/token.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(TokenService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true; // no está logueado, puede acceder a login o register
  } else {
    router.navigate(['/']); // ya está logueado, lo mandamos al home (o dashboard)
    return false;
  }
};
