import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-faqs-form',
  standalone: false,
  templateUrl: './product-faqs-form.component.html',
  styleUrls: ['./product-faqs-form.component.scss']
})
export class ProductFaqsFormComponent {

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
