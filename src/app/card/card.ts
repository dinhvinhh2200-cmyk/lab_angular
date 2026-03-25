import { Component, input, signal, output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  card_price = input.required<number>();
  card_title = input.required<string>();
  card_mota = input.required<string>();
  discount = input<number>();
  colorListInput = input.required<any[]>();

  // Chỉ số ảnh hiện tại
  currentIndex = signal(0);

  next() {
    const totalImg = this.listImages().length;
    const current = this.currentIndex();
    this.currentIndex.set(current === totalImg - 1 ? 0 : current + 1);
  }

  prev() {
    const totalImg = this.listImages().length;
    const current = this.currentIndex();
    this.currentIndex.set(current === 0 ? totalImg - 1 : current - 1);
  }

  // xử lý tăng giảm quantity

  quantily = signal(1);
  onQuantityChange = output<{ id: number, quantity: number }>();
  increase() {
    this.quantily.update((initValue) => initValue + 1);
    this.onQuantityChange.emit({ id: 0, quantity: this.quantily() });
  }
  decrease() {
    if (this.quantily() > 1) {
      this.quantily.update((initValue) => initValue - 1);
      this.onQuantityChange.emit({ id: 0, quantity: this.quantily() });
    }
  }

  selectColorId = signal<number>(0);
  listImages = signal<string[]>([]);

  ngOnInit() {
    const defaultValue = this.colorListInput()[0];
    if (defaultValue) {
      this.selectColorId.set(defaultValue.id);
      this.listImages.set(defaultValue.images);
    }
  }

  chooseColor(id: number) {
    this.selectColorId.set(id);

    const selectColor = this.colorListInput().find((item) => item.id === id);
    if (selectColor) {
      this.listImages.set(selectColor.images);
      this.currentIndex.set(0);
    }
  }

  // xử lý nút chọn size
  sizeList = [
    { id: 1, size: 'M' },
    { id: 2, size: 'L' },
    { id: 3, size: 'XL' },
    { id: 4, size: '2XL' },
  ];
  selectSizeId = signal<number>(1);
  chooseSize(id: number) {
    this.selectSizeId.set(id);
  }

  // xử lý nút yêu thích
  isFavorite = signal(false);
  onFavoriteChange = output<{ title: string; isAdd: boolean }>();
  toggleFavorite() {
    this.isFavorite.update((initValue) => !initValue);

    this.onFavoriteChange.emit({
      title: this.card_title(),
      isAdd: this.isFavorite(),
    });
  }

  // xử lý nút buy now
  onBuy = output<{ id: number; title: string; price: number; quantity: number }>();
  handleBuyNow() {
    this.onBuy.emit({
      id: 0, 
      title: this.card_title(),
      price: this.card_price(),
      quantity: this.quantily(), 
    });
  }

}

