import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
  selected?: boolean;
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
        // Nếu sản phẩm đã có, thực hiện CỘNG DỒN số lượng và tính lại tổng giá
        return prevItems.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: i.quantity + item.quantity, // Cộng dồn: 2 + 3 = 5
                price: (i.price / i.quantity) * (i.quantity + item.quantity), // Tính lại tổng giá dựa trên đơn giá
              }
            : i,
        );
      }
      // Nếu chưa có, thêm mới vào đầu danh sách
      return [item, ...prevItems];
    });
    alert(`Đã thêm ${item.quantity} sản phẩm vào giỏ hàng!`);
  }

  // hàm cập nhập số lượng
  updateQuantity(productId: number, amount: number) {
    this.CartItems.update((items) =>
      items.map((item) => {
        if (item.id === productId) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      }),
    );
  }

  // Thêm hàm xóa nếu cần
  removeFromCart(productId: number) {
    this.CartItems.update((items) => items.filter((i) => i.id !== productId));
  }
}
