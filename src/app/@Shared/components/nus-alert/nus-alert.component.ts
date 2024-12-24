import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nus-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nus-alert.component.html',
  styleUrls: ['./nus-alert.component.scss']
})
export class NusAlertComponent {

  @Input() alertMsg!: string;
}
