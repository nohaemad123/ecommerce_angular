import { LocalStorageService } from '@Shared/services/local-storage.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const localSTRG = inject(LocalStorageService)
  if (!localSTRG.getItem('currentUser')) {
    return router.navigate(['/Auth/Sign-In'])
  }
  return true;
};
