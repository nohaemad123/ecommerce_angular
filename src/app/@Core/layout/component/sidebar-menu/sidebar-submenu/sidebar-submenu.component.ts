import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgTemplateOutlet } from '@angular/common';
import { SubMenuItem } from 'src/app/Data/models/layout/menu';
import { MenuService } from '@Core/layout/menu.service';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-sidebar-submenu',
  standalone: true,
  templateUrl: './sidebar-submenu.component.html',
  styleUrls: ['./sidebar-submenu.component.scss'],
  imports: [
    NgClass,
    NgFor,
    NgTemplateOutlet,
    RouterLinkActive,
    RouterLink,
    TranslocoModule
  ],
})
export class SidebarSubmenuComponent implements OnInit {
  @Input() public submenu = <SubMenuItem>{};

  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleMenu(menu: any) {
    this.menuService.toggleSubMenu(menu);
  }

  private collapse(items: Array<any>) {
    items.forEach((item) => {
      item.expanded = false;
      if (item.children) this.collapse(item.children);
    });
  }
}
