import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  handleCardBuy (title: string) {
    alert(`Đã mua sản phẩm ${title} thành công!`)
  }

  handleCardFav (event: {title: string, isAdd: boolean}) {
    if (event.isAdd) {
      alert(`Bạn đã thêm ${event.title} vào mục yêu thích thành công!`);
    }else {
      alert(`Bạn đã bỏ yêu thích sản phẩm ${event.title}`);
    }
  }
}
