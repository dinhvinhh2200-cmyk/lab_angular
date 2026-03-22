import { Component, input, signal, output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  listImg = input<string[]>();

  card_price = input.required<number>();
  card_title = input.required<string>();
  card_mota = input.required<string>();
  discount = input<number>();

  // Chỉ số ảnh hiện tại
  currentIndex = signal(0);

  next() {
    const totalImg = this.listImg()?.length || 0;
    const current = this.currentIndex();

    // Nếu đang ở ảnh cuối cùng (vị trí bằng tổng số ảnh trừ 1)
    if (current === totalImg - 1) {
      this.currentIndex.set(0); // Quay về ảnh đầu tiên
    } else {
      this.currentIndex.set(current + 1); // Nếu không thì tăng thêm 1
    }
  }

  prev() {
    const totalImg = this.listImg()?.length || 0;
    const current = this.currentIndex();

    // Nếu đang ở ảnh đầu tiên
    if (current === 0) {
      this.currentIndex.set(totalImg - 1); // Nhảy đến ảnh cuối cùng
    } else {
      this.currentIndex.set(current - 1); // Nếu không thì lùi lại 1
    }
  }

  // xử lý tăng giảm quantity
  quantily = signal(1);
  increase() {
    this.quantily.update((initValue) => initValue + 1);
  }
  decrease() {
    if (this.quantily() > 1) {
      this.quantily.update((initValue) => initValue - 1);
    }
  }

  // xử lý nút chọn màu
  colorList = [
    { id: 1, color: '#0D1D3E' },
    { id: 2, color: '#FA3137' },
    { id: 3, color: '#73BB7B' },
    { id: 4, color: '#FCBB43' },
    { id: 5, color: '#DB9559' },
  ];
  selectColorId = signal(this.colorList.length);
  chooseColor(id: number) {
    this.selectColorId.set(id);
  }

  // xử lý nút chọn size
  sizeList = [
    { id: 1, size: '45*53' },
    { id: 2, size: '42*40' },
    { id: 3, size: '40*40' },
    { id: 4, size: '35*49' },
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
    // this.isFavorite()
    //   ? alert(`Bạn đã thêm sản phẩm ${this.card_title()} vào mục yêu thích thành công!`)
    //   : alert(`Bạn đã bỏ yêu thích sản phẩm ${this.card_title()}`);
    this.onFavoriteChange.emit({
      title: this.card_title(),
      isAdd: this.isFavorite(),
    });
  }

  // xử lý nút buy now
  onBuy = output<string>();
  handleBuyNow() {
    this.onBuy.emit(this.card_title());
  }
}
