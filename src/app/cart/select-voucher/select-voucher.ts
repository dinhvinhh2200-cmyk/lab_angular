import { Component, inject } from '@angular/core';
import { CartService, Voucher } from '../cart.service';

@Component({
  selector: 'app-select-voucher',
  standalone: false,
  templateUrl: './select-voucher.html',
  styleUrl: './select-voucher.css',
})
export class SelectVoucher {
  cartService = inject(CartService);
 isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  isVoucherSelected(voucher: Voucher): boolean {
    return this.cartService.selectedVouchers().some(v => v.id === voucher.id);
  }
}
