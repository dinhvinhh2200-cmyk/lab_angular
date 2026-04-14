import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-select-voucher',
  standalone: false,
  templateUrl: './select-voucher.html',
  styleUrl: './select-voucher.css',
})
export class SelectVoucher {
  cartService = inject(CartService);
}
