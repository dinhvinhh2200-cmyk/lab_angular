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
  cartItems = this.cartService.items

  increaseQty(id: number) {
    this.cartService.updateQuantity(id , 1)
  }

  decreaseQty(id: number) {
    this.cartService.updateQuantity(id, -1);
  }
}
