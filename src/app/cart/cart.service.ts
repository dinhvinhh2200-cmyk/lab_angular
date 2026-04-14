import { Injectable, signal, computed } from "@angular/core";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
  selected?: boolean
}
@Injectable({
  providedIn: 'root'
})

export class CartService {
  private CartItems = signal<CartItem[]>([])
  items = computed(() => this.CartItems())

  addToCart(item: CartItem){
    this.CartItems.update(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id)
      if (existingItem) {
        return prevItems.map(i => i.id === item.id ? {...i, quantity: i.quantity + item.quantity} : i)
      }
      return [item, ...prevItems]
    })
    alert(`Đã thêm ${item.quantity} sản phẩm vào giỏ hàng!`)
  }
}