import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList {
  private cartService = inject(CartService);
  
  // Lấy signal từ service về để dùng trong template
  cartItems = this.cartService.items
}
