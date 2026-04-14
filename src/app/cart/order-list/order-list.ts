import { Component, inject } from '@angular/core';
import { CartService, CartItem } from '../cart.service';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList {
  public cartService = inject(CartService);

  // Lấy signal từ service về để dùng trong template
  cartItems = this.cartService.items;

  // src/app/cart/order-list/order-list.ts (Ví dụ)

  // Hàm tăng số lượng
increaseQty(item: CartItem) {
  const newQty = item.quantity + 1;
  this.cartService.updateQuantity(item.id, newQty);
}

// Hàm giảm số lượng
decreaseQty(item: CartItem) {
  if (item.quantity > 1) {
    const newQty = item.quantity - 1;
    this.cartService.updateQuantity(item.id, newQty);
  }
}

// Nếu người dùng nhập số trực tiếp vào input
onQuantityChange(item: CartItem, event: any) {
  const val = parseInt(event.target.value);
  if (val > 0) {
    this.cartService.updateQuantity(item.id, val);
  } else {
    event.target.value = 1; // Reset về 1 nếu nhập số âm hoặc 0
    this.cartService.updateQuantity(item.id, 1);
  }
}
}
