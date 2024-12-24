import { Component, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { AuthService } from 'src/app/Data/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';
import { LocalStorageService } from '@Shared/services/local-storage.service';

@Component({
  selector: 'user-profile-dropdown',
  standalone: true,
  imports: [CommonModule,
    NgClass,
    NgIf,
    RouterLink,
    ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  // injectable
  _authService = inject(AuthService);
  _router = inject(Router);
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService);
  _localStorageService = inject(LocalStorageService);
  _el = inject(ElementRef)

  isDropdownOpen: boolean = false;
  currentUser = JSON.parse(this._localStorageService.getItem('currentUser'));

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this._el.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  logout(){

      this._authService.logout();
      this._toastrService.success(
        this._translocoService.translate('logout_success_message.title'),
        this._translocoService.translate('logout_success_message.subTitle'),
        { toastClass: 'toast ngx-toastr', closeButton: true }
      )
      this._router.navigate(['/Auth/Sign-In']);
    }

}
