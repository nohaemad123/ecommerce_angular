import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyState } from 'src/app/Data/models/empty-state/empty-state';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule,TranslocoModule,RouterModule],
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent implements OnInit{
  @Input() emptyStateData! : EmptyState;

  ngOnInit(): void {
    
  }
}
