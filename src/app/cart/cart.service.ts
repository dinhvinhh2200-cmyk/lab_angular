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

  // Cập nhật danh sách voucher theo yêu cầu mới
  vouchers = signal([
    {
      id: 1,
      code: 'AO50K',
      name: 'Giảm 50k cho Áo',
      applyFor: 'AO', // Dùng để nhận diện loại sản phẩm
      discountType: 'fixed',
      value: 50000,
      minSpend: 50000,
      description: 'Giảm 50.000đ cho đơn hàng Áo từ 50.000đ',
    },
    {
      id: 2,
      code: 'QUAN50K',
      name: 'Giảm 50k cho Quần',
      applyFor: 'QUAN',
      discountType: 'fixed',
      value: 50000,
      minSpend: 50000,
      description: 'Giảm 50.000đ cho đơn hàng Quần từ 50.000đ',
    },
  ]);

  selectedVoucher = signal<any | null>(null);

  // Hàm tính tổng tiền theo loại sản phẩm (Áo hoặc Quần) được tick
  getTotalByCategory(category: string) {
    return this.CartItems()
      .filter(item => item.selected && item.description.toUpperCase().includes(category))
      .reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  }

  // Kiểm tra voucher có hợp lệ không
  isVoucherValid(voucher: any): boolean {
    const categoryTotal = this.getTotalByCategory(voucher.applyFor);
    return categoryTotal >= voucher.minSpend;
  }

  selectVoucher(voucher: any) {
    // Nếu chưa đủ điều kiện thì không cho chọn
    if (!this.isVoucherValid(voucher)) {
      alert(`Bạn chưa đủ điều kiện! Tổng tiền ${voucher.applyFor} phải từ 50.000đ`);
      return;
    }
    
    // Nếu bấm lại voucher đang chọn thì hủy chọn (toggle)
    this.selectedVoucher.set(this.selectedVoucher()?.id === voucher.id ? null : voucher);
  }
}
