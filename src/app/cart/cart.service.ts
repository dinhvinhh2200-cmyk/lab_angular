import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
  selected?: boolean;
  unitPrice: number; // Thêm cột này để lưu giá gốc
}
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private CartItems = signal<CartItem[]>([]);
  items = computed(() => this.CartItems());

  vouchers = signal([
    {
      id: 1,
      code: 'AOPRO10',
      name: 'Voucher Áo 10%',
      applyFor: 'AO',
      discountType: 'percent',
      value: 10,
      description: 'Giảm 10% cho tất cả các loại áo',
    },
    {
      id: 2,
      code: 'QUAN20K',
      name: 'Giảm 20k cho Quần',
      applyFor: 'QUAN',
      discountType: 'fixed',
      value: 20000,
      description: 'Giảm ngay 20.000đ khi mua quần',
    },
  ]);

  selectedVoucher = signal<any | null>(null);

  selectVoucher(voucher: any) {
    this.selectedVoucher.set(this.selectedVoucher()?.id === voucher.id ? null : voucher);
  }

  // src/app/cart/cart.service.ts

  addToCart(item: CartItem) {
    this.CartItems.update((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: i.quantity + item.quantity,
                // Quan trọng: Lấy unitPrice nhân với tổng số lượng mới
                price: i.unitPrice * (i.quantity + item.quantity),
              }
            : i,
        );
      }
      return [item, ...prevItems];
    });
  }

  // hàm cập nhập số lượng
  updateQuantity(productId: number, newQty: number) {
    this.CartItems.update((items) =>
      items.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQty, price: item.unitPrice * newQty }
          : item,
      ),
    );
  }

  // Thêm hàm xóa nếu cần
  removeFromCart(productId: number) {
    this.CartItems.update((items) => items.filter((i) => i.id !== productId));
  }

  // Tính tổng tiền các item đã được tích checkbox
  selectedTotal = computed(() => {
    return this.CartItems()
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  });

  // Hàm thay đổi trạng thái checkbox
  toggleSelection(productId: number) {
    this.CartItems.update((items) =>
      items.map((item) => (item.id === productId ? { ...item, selected: !item.selected } : item)),
    );
  }
}
