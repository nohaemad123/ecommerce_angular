import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "./component/sidebar/sidebar.component";
import { NavbarComponent } from "./component/navbar/navbar.component";
import { FooterComponent } from "./component/footer/footer.component";
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    imports: [SidebarComponent, NavbarComponent, FooterComponent, RouterOutlet,CommonModule]
})
export class LayoutComponent {
    private mainContent: HTMLElement | null = null;

    constructor(private router: Router) {
      // this.router.events.subscribe((event) => {
      //   if (event instanceof NavigationEnd) {
      //     if (this.mainContent) {
      //       this.mainContent!.scrollTop = 0;
      //     }
      //   }
      // });
    }

    ngOnInit(): void {
      this.mainContent = document.getElementById('main-content');
    }
}
