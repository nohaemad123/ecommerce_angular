import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MenuService } from '@Core/layout/menu.service';
import { SubMenuItem } from 'src/app/Data/models/layout/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarSubmenuComponent } from './sidebar-submenu/sidebar-submenu.component';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  imports: [
    NgFor,
    NgClass,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    SidebarSubmenuComponent,
    TranslocoModule],
})
export class SidebarMenuComponent implements OnInit {
  constructor(public menuService: MenuService) {}

  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
  }

  ngOnInit(): void {}
}
