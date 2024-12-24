import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MenuService } from '@Core/layout/menu.service';
import { SidebarMenuComponent } from "../sidebar-menu/sidebar-menu.component";
import { AuthService } from 'src/app/Data/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [
        CommonModule,
        NgClass,
        NgIf,
        RouterLink,
        SidebarComponent,
        SidebarMenuComponent
    ]
})
export class SidebarComponent implements OnInit {
  public appJson: any = '../../../../../../package.json';
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService);
  _authService = inject(AuthService);
  _menuService = inject(MenuService);
  _router = inject(Router);


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }


  public toggleSidebar() {
    this._menuService.toggleSidebar();
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
