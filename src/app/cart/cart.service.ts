import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
  selected?: boolean;
  unitPrice: number;
}

export interface Voucher {
  id: number;
  code: string;
  name: string;
  applyFor: 'AO' | 'QUAN' | 'ALL';
  discountType: 'fixed' | 'percent';
  value: number;
  minSpend: number;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // 1. Quản lý danh sách sản phẩm trong giỏ hàng
  private CartItems = signal<CartItem[]>([]);
  items = computed(() => this.CartItems());

  // 2. Quản lý danh sách Voucher
  vouchers = signal<Voucher[]>([
    {
      id: 1,
      code: 'AO50K',
      name: 'Giảm 50k cho Áo',
      applyFor: 'AO',
      discountType: 'fixed',
      value: 50000,
      minSpend: 50000,
      description: 'Đơn hàng Áo từ 50.000đ',
    },
    {
      id: 2,
      code: 'QUAN50K',
      name: 'Giảm 50k cho Quần',
      applyFor: 'QUAN',
      discountType: 'fixed',
      value: 50000,
      minSpend: 50000,
      description: 'Đơn hàng Quần từ 50.000đ',
    },
  ]);

  // Voucher đang được chọn
  selectedVoucher = signal<Voucher | null>(null);

  // --- CÁC HÀM THAO TÁC GIỎ HÀNG ---

  addToCart(item: CartItem) {
    this.CartItems.update((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: i.quantity + item.quantity,
                price: i.unitPrice * (i.quantity + item.quantity),
              }
            : i
        );
      }
      return [item, ...prevItems];
    });
  }

  updateQuantity(productId: number, newQty: number) {
    if (newQty < 1) return;
    this.CartItems.update((items) =>
      items.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQty, price: item.unitPrice * newQty }
          : item
      )
    );
  }

  removeFromCart(productId: number) {
    this.CartItems.update((items) => items.filter((i) => i.id !== productId));
    // Nếu xóa sản phẩm dẫn đến voucher không còn hợp lệ, hãy hủy chọn voucher
    this.checkVoucherValidity();
  }

  toggleSelection(productId: number) {
    this.CartItems.update((items) =>
      items.map((item) =>
        item.id === productId ? { ...item, selected: !item.selected } : item
      )
    );
    // Kiểm tra lại tính hợp lệ của voucher sau khi thay đổi tích chọn
    this.checkVoucherValidity();
  }

  // --- LOGIC TÍNH TOÁN & VOUCHER ---

  // Tính tổng tiền của các sản phẩm ĐƯỢC CHỌN và ĐÚNG LOẠI (AO/QUAN)
  getTotalByCategory(category: string) {
    return this.CartItems()
      .filter((item) => {
        const isSelected = item.selected === true;
        const searchStr = (item.name + item.description).toUpperCase();
        const isRightCategory =
          category === 'ALL' || searchStr.includes(category.toUpperCase());
        return isSelected && isRightCategory;
      })
      .reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  }

  // Tổng tiền tạm tính của tất cả sản phẩm được tích chọn (Chưa giảm giá)
  selectedTotal = computed(() => {
    return this.CartItems()
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  });

  // Kiểm tra voucher có thỏa mãn điều kiện ≥ 50k không
  isVoucherValid(voucher: Voucher): boolean {
    const categoryTotal = this.getTotalByCategory(voucher.applyFor);
    return categoryTotal >= voucher.minSpend;
  }

  // Chọn hoặc hủy chọn Voucher
  selectVoucher(voucher: Voucher) {
    if (!this.isVoucherValid(voucher)) {
      alert(
        `Chưa đủ điều kiện! Tổng tiền hàng ${
          voucher.applyFor
        } được chọn phải từ ${voucher.minSpend.toLocaleString()}đ`
      );
      return;
    }
    // Toggle: Nếu bấm vào cái đang chọn thì hủy chọn
    this.selectedVoucher.set(
      this.selectedVoucher()?.id === voucher.id ? null : voucher
    );
  }

  // Tự động hủy chọn voucher nếu người dùng bỏ tích sản phẩm khiến điều kiện không còn thỏa mãn
  private checkVoucherValidity() {
    const currentVoucher = this.selectedVoucher();
    if (currentVoucher && !this.isVoucherValid(currentVoucher)) {
      this.selectedVoucher.set(null);
    }
  }

  // Tính số tiền được giảm giá
  discountAmount = computed(() => {
    const voucher = this.selectedVoucher();
    if (!voucher || !this.isVoucherValid(voucher)) return 0;

    if (voucher.discountType === 'fixed') {
      return voucher.value;
    } else {
      // Ví dụ nếu sau này có voucher giảm theo %
      const total = this.getTotalByCategory(voucher.applyFor);
      return (total * voucher.value) / 100;
    }
  });

  // Tổng tiền cuối cùng khách phải trả
  finalTotal = computed(() => {
    return Math.max(0, this.selectedTotal() - this.discountAmount());
  });
}