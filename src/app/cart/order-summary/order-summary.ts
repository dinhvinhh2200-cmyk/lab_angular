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

  // 1. Tiền hàng (Tổng những món đã tích)
  subtotal = computed(() => this.cartService.selectedTotal());

  // 2. Tính phí ship
  shippingFee = computed(() => {
    const amount = this.subtotal();
    if (amount === 0 || amount >= this.FREE_SHIP_LIMIT) {
      return 0; // Miễn phí nếu đủ 200k hoặc chưa chọn món nào
    }
    return this.SHIPPING_FEE;
  });

  // 3. Tổng thanh toán
  totalOrder = computed(() => this.subtotal() + this.shippingFee());

  // Kiểm tra xem đã đủ điều kiện freeship chưa để hiện chữ "Free"
  isFreeShip = computed(() => this.subtotal() >= this.FREE_SHIP_LIMIT && this.subtotal() > 0);
  
}
