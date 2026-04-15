// order-summary.ts
import { Component, inject, computed } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-order-summary',
  standalone: false,
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.css',
})
export class OrderSummary {
  public cartService = inject(CartService);

  readonly FREE_SHIP_LIMIT = 200000;
  readonly SHIPPING_FEE = 20000;

  subtotal = computed(() => this.cartService.selectedTotal());
  discountAmount = computed(() => this.cartService.discountAmount());

  shippingFee = computed(() => {
    const amount = this.subtotal();
    if (amount === 0 || amount >= this.FREE_SHIP_LIMIT) {
      return 0;
    }
    return this.SHIPPING_FEE;
  });

  totalOrder = computed(() => Math.max(0, this.subtotal() - this.discountAmount()) + this.shippingFee());

  isFreeShip = computed(() => this.subtotal() >= this.FREE_SHIP_LIMIT && this.subtotal() > 0);
}