import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-marketing-form',
  standalone: false,
  templateUrl: './product-marketing-form.component.html',
  styleUrls: ['./product-marketing-form.component.scss']
})
export class ProductMarketingFormComponent {

  @Input() mode!: string;
  @Input() productData: any;
  @Output() nextEmitter = new EventEmitter();
  @Output() previousEmitter = new EventEmitter();

  onNext(): void {
    this.nextEmitter.emit({});
  }

  onPervious(): void {
    this.previousEmitter.emit();
  }

}
