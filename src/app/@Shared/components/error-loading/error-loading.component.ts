import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-error-loading',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './error-loading.component.html',
  styleUrls: ['./error-loading.component.scss']
})
export class ErrorLoadingComponent {
  @Input() error_msg = ''
}
