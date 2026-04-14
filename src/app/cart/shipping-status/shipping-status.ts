import { Component, inject, computed } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shipping-status',
  standalone: false,
  templateUrl: './shipping-status.html',
  styleUrl: './shipping-status.css',
})
export class ShippingStatus {
  // Inject service để lấy dữ liệu giỏ hàng
  public cartService = inject(CartService);

  readonly GOAL = 200000;

  // 1. Lấy tổng tiền các sản phẩm đã được tích (giúp hiển thị số tiền ở HTML)
  totalAmount = computed(() => this.cartService.selectedTotal());

  // 2. Tính % dựa trên tổng tiền đã chọn
  progressPercent = computed(() => {
    const total = this.totalAmount();
    if (total <= 0) return 0;
    const percent = (total / this.GOAL) * 100;
    return Math.min(percent, 100); // Giới hạn tối đa 100% để xe không chạy ra khỏi thanh
  });

  // 3. Tính số tiền còn thiếu (để hiển thị thông báo)
  remainingAmount = computed(() => {
    const remaining = this.GOAL - this.totalAmount();
    return remaining > 0 ? remaining : 0;
  });
}