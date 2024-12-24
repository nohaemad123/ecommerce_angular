import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesComponent } from '@Core/layout/common/languages/languages.component';
import { UserComponent } from '@Core/layout/common/user/user.component';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    imports: [CommonModule, UserComponent,LanguagesComponent]
})
export class NavbarComponent {

}
