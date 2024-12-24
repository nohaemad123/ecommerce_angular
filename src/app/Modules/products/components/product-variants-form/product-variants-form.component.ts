import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-variants-form',
  standalone: false,
  templateUrl: './product-variants-form.component.html',
  styleUrls: ['./product-variants-form.component.scss']
})
export class ProductVariantsFormComponent {

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
