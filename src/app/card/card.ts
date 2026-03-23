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
    {
      id: 1,
      color: '#000000',
      images: [
        '/ao_den_1.jpg',
        '/ao_den_2.jpg',
        '/ao_den_3.jpg'
      ]
    },
      
    {
      id: 2,
      color: '#FF0000',
      images: [
        '/ao_do_1.jpg',
        '/ao_do_2.jpg',
        '/ao_do_3.jpg'
      ]
    },

    {
      id: 3,
      color: '#0000FF',
      images: [
        '/ao_xanh_1.jpg',
        '/ao_xanh_2.jpg',
        '/ao_xanh_3.jpg'
      ]
    }
  ];
  selectColorId = signal(this.colorList[0].id);
  listImages = signal<string[]>(this.colorList[0].images)
  chooseColor(id: number) {
    this.selectColorId.set(id);

    const selectColor = this.colorList.find((item) => item.id === id)
    if (selectColor) {
      this.listImages.set(selectColor.images)
       this.currentIndex.set(0)  
    }
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

// bây giờ tôi muốn là khi bấm vào cái nút chọn màu sắc thì nó sẽ hiện ra cái slider chứa 3 cái slides có sản phẩm của màu đó vd như tôi bấm vào nút color màu đen thì nó sẽ có slider chứa 3 cái slides lần lượt mỗi cái là cái hình của sản phẩm màu đó tương tự như nút đỏ và xanh 