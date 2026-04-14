import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';

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

  updateQuantity(item: any, newQuantity: number) {
    if (newQuantity < 1) return;

    // Tính toán lại tổng giá dựa trên đơn giá gốc
    const updatedPrice = item.unitPrice * newQuantity;

    // Gửi thông tin cập nhật vào service
    this.cartService.addToCart({
      ...item,
      quantity: newQuantity,
      price: updatedPrice,
    });
  }

  increaseQty(id: number) {
    this.cartService.updateQuantity(id, 1);
  }

  decreaseQty(id: number) {
    this.cartService.updateQuantity(id, -1);
  }
}
