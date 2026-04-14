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
  // 1. Quản lý danh sách sản phẩm
  private CartItems = signal<CartItem[]>([]);
  items = computed(() => this.CartItems());

  // 2. Danh sách Voucher
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

  // 3. Danh sách Voucher đang chọn (Hỗ trợ chọn nhiều cái)
  selectedVouchers = signal<Voucher[]>([]);

  private removeAccents(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }

  // --- HÀM GIỎ HÀNG (SỬA ĐỂ TÍNH TOÁN LẠI NGAY LẬP TỨC) ---

  addToCart(item: CartItem) {
    this.CartItems.update((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity, price: i.unitPrice * (i.quantity + item.quantity) } 
            : i
        );
      }
      return [item, ...prev];
    });
    this.checkVoucherValidity();
  }

  updateQuantity(productId: number, newQty: number) {
    if (newQty < 1) return;
    this.CartItems.update((items) =>
      items.map((i) =>
        i.id === productId ? { ...i, quantity: newQty, price: i.unitPrice * newQty } : i
      )
    );
    this.checkVoucherValidity();
  }

  removeFromCart(productId: number) {
    this.CartItems.update((items) => items.filter((i) => i.id !== productId));
    this.checkVoucherValidity();
  }

  toggleSelection(productId: number) {
    this.CartItems.update((items) =>
      items.map((i) => (i.id === productId ? { ...i, selected: !i.selected } : i))
    );
    this.checkVoucherValidity();
  }

  // --- LOGIC VOUCHER ---

  getTotalByCategory(category: string) {
    return this.CartItems()
      .filter((item) => {
        if (!item.selected) return false;
        const searchStr = this.removeAccents(item.name + item.description).toUpperCase();
        return category === 'ALL' || searchStr.includes(category.toUpperCase());
      })
      .reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  }

  isVoucherValid(voucher: Voucher): boolean {
    return this.getTotalByCategory(voucher.applyFor) >= voucher.minSpend;
  }

  selectVoucher(voucher: Voucher) {
    if (!this.isVoucherValid(voucher)) {
      alert(`Chưa đủ điều kiện cho mã ${voucher.code}!`);
      return;
    }

    // Cập nhật mảng mới để trigger computed
    const currentSelected = this.selectedVouchers();
    const isExist = currentSelected.some(v => v.id === voucher.id);
    
    if (isExist) {
      this.selectedVouchers.set(currentSelected.filter(v => v.id !== voucher.id));
    } else {
      this.selectedVouchers.set([...currentSelected, voucher]);
    }
  }

  private checkVoucherValidity() {
    // Lọc lại những voucher vẫn còn hợp lệ sau khi thay đổi giỏ hàng
    const validVouchers = this.selectedVouchers().filter(v => this.isVoucherValid(v));
    this.selectedVouchers.set(validVouchers);
  }

  // --- TÍNH TOÁN TIỀN (SẼ TỰ ĐỘNG CẬP NHẬT GIAO DIỆN) ---

  selectedTotal = computed(() => {
    return this.CartItems()
      .filter((i) => i.selected)
      .reduce((t, i) => t + i.unitPrice * i.quantity, 0);
  });

  discountAmount = computed(() => {
    return this.selectedVouchers().reduce((sum, v) => sum + v.value, 0);
  });

  finalTotal = computed(() => {
    return Math.max(0, this.selectedTotal() - this.discountAmount());
  });
}