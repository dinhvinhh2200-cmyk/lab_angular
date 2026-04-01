import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private router = inject(ActivatedRoute);
  product = signal<any>(null);
  selectedColorIndex = signal<number>(0);
  selectedSize = signal<string>('M');
  quantity = signal<number>(0);
  cart = signal<CartItem[]>([]);

  ngOnInit() {
    const id = Number(this.router.snapshot.paramMap.get('id'));

    const allProduct = [
      {
        id: 1,
        card_title: 'T-Shirt',
        card_price: 15000,
        discount: 25000,
        card_mota: 'Áo thun cơ bản, thoáng mát phù hợp mặc hàng ngày.',
        colors: [
          { id: 1, color: '#000000', nameColor: 'đen', images: ['/ao_den_1.jpg', '/ao_den_2.jpg', '/ao_den_3.jpg'] },
          { id: 2, color: '#FF0000', nameColor: 'đỏ', images: ['/ao_do_1.jpg', '/ao_do_2.jpg', '/ao_do_3.jpg'] },
          {
            id: 3,
            color: '#0000FF',
            nameColor: 'xanh',
            images: ['/ao_xanh_1.jpg', '/ao_xanh_2.jpg', '/ao_xanh_3.jpg'],
          },
        ],
      },

      {
        id: 2,
        card_title: 'Polo T-Shirt',
        card_price: 20000,
        discount: 30000,
        card_mota: 'Áo Polo có cổ, thoáng mát phù hợp mặc hàng ngày và đi chơi.',
        colors: [
          {
            id: 1,
            color: '#000000',
            nameColor: 'đen',
            images: ['/ao_polo_den_1.jpg', '/ao_polo_den_2.jpg', '/ao_polo_den_3.jpg'],
          },
          {
            id: 2,
            color: '#FF0000',
            nameColor: 'đỏ',
            images: [
              '/ao_polo_do_1.jpg',
              'https://i.pinimg.com/1200x/3b/eb/95/3beb954d1230369f9974dc416c9e0794.jpg',
              'https://i.pinimg.com/1200x/ad/98/42/ad984289001bb439bd4b2ca8fc4259a9.jpg',
            ],
          },
          {
            id: 3,
            color: '#0000FF',
            nameColor: 'xanh',
            images: [
              'https://i.pinimg.com/1200x/da/bd/bd/dabdbdece8d67b663ffa8bd39889d657.jpg',
              'https://i.pinimg.com/1200x/69/15/2e/69152e568b511db30c5074c0aedc5f6e.jpg',
              'https://i.pinimg.com/1200x/a9/f5/84/a9f584cead90cb7cd0b204545444b986.jpg',
            ],
          },
        ],
      },

      {
        id: 3,
        card_title: 'Áo len cổ tròn',
        card_price: 25000,
        discount: 35000,
        card_mota: 'Áo Len cổ tròn, thoáng mát phù hợp mặc hàng ngày và đi chơi.',
        colors: [
          {
            id: 1,
            color: '#000000',
            nameColor: 'đen',
            images: [
              'https://i.pinimg.com/736x/24/fd/f8/24fdf8b222a565ef7d20312210426e32.jpg',
              'https://i.pinimg.com/736x/48/97/ea/4897ea37e8636b15c7f3790e76231ef0.jpg',
              'https://i.pinimg.com/736x/35/60/e5/3560e5b57839fb7ec0e768eb27667654.jpg',
            ],
          },
          {
            id: 2,
            color: '#C9C1B6',
            nameColor: 'be',
            images: [
              'https://i.pinimg.com/1200x/85/c2/29/85c229f289aac0bcda11dc8a399dc97c.jpg',
              'https://i.pinimg.com/736x/57/34/e4/5734e40367443c32ea271c1171a7edfe.jpg',
              'https://i.pinimg.com/736x/ee/86/08/ee8608c9db06791302f5de7c4b231224.jpg',
            ],
          },
          {
            id: 3,
            color: '#553631',
            nameColor: 'nâu',
            images: [
              'https://i.pinimg.com/1200x/3b/d7/b2/3bd7b2fdd6a50372e39100d0690e16a8.jpg',
              'https://i.pinimg.com/1200x/4f/8c/7d/4f8c7d5a5778337ef5c141e278e8dde6.jpg',
              'https://i.pinimg.com/1200x/fd/78/b5/fd78b5335fd717990335c7a1b88c52cb.jpg',
            ],
          },
        ],
      },

      {
        id: 4,
        card_title: 'Áo Hoodie',
        card_price: 40000,
        discount: 45000,
        card_mota: 'Áo Hoodie, ấm áp phù hợp mặc hàng ngày vào mùa đông.',
        colors: [
          {
            id: 1,
            color: '#000000',
            nameColor: 'đen',
            images: [
              'https://image.hm.com/assets/hm/c3/f4/c3f47e10c3684be17ef083336398ae4a85eb10f3.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/81/80/81807aa0852097d749f1465ed550259aac6147b4.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/d2/c4/d2c4d9961e4b5c9209c5b800d7d5d10fa92cc571.jpg?imwidth=2160',
            ],
          },
          {
            id: 2,
            color: '#BCCCE4',
            nameColor: 'xanh nhạt',
            images: [
              'https://image.hm.com/assets/hm/8f/5d/8f5d51e2220a7f1234cb7387d8372a75721f03d4.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/5a/3e/5a3ec5a72448ff4086a97ec88ef7b4d5e32d26d8.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/0b/1f/0b1f302ebb0d61617d1486d28bd9e464167debf4.jpg?imwidth=2160',
            ],
          },
          {
            id: 3,
            color: '#6E727B',
            nameColor: 'xám',
            images: [
              'https://image.hm.com/assets/hm/dd/6b/dd6b022f57e4776494de78650599b067cc124536.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/0e/e9/0ee9a15d91d27ccaf24d22aae46e5d93a34a8b9b.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/bf/06/bf061accc7e8739001d9edb5101818b0edd4cc21.jpg?imwidth=2160',
            ],
          },
        ],
      },

      {
        id: 5,
        card_title: 'Áo Hoodie zip',
        card_price: 42000,
        discount: 48000,
        card_mota: 'Áo Hoodie zip, ấm áp phù hợp mặc hàng ngày vào mùa đông.',
        colors: [
          {
            id: 1,
            color: '#000000',
            nameColor: 'đen',
            images: [
              'https://image.hm.com/assets/hm/c6/a0/c6a03d8b6245efa9e33ba869afab9ec800a0b3fc.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/ff/5d/ff5d20d9d6121e11080e13d50f6f97ce63488d51.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/aa/b5/aab5ce91d085f13a378155b200d9e49591e3fd5f.jpg?imwidth=2160',
            ],
          },
          {
            id: 2,
            color: '#D8D9DB',
            nameColor: 'xám tiêu',
            images: [
              'https://image.hm.com/assets/hm/8b/6a/8b6a1a7123dab8fdbe54816bcb32c00881902668.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/b7/b4/b7b464dfca5c9cdbd5fd8456287f79cef026845c.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/50/bb/50bbb74057bb7c4d350bff0f3f4f393a32315f69.jpg?imwidth=2160',
            ],
          },
          {
            id: 3,
            color: '#68656C',
            nameColor: 'xám',
            images: [
              'https://image.hm.com/assets/hm/ba/ad/baad12413d52bd0402e35111dd4563ae6d0576b0.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/a9/6b/a96bea2c04d071dc2e0aa825eeac309b27e65d2b.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/b8/64/b8646345856a7096c4e863a5123b982bc8ae4a7f.jpg?imwidth=2160',
            ],
          },
        ],
      },

      {
        id: 6,
        card_title: 'Quần Kaki dài',
        card_price: 50000,
        discount: 55000,
        card_mota: 'Quần Kaki dài, chất vải mềm mịn mặc hàng ngày thoải mái.',
        colors: [
          {
            id: 1,
            color: '#756556',
            nameColor: 'rêu',
            images: [
              'https://image.hm.com/assets/hm/13/e6/13e606f33d583555ce1c52e962e0ab3928d49f8b.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/d2/89/d28908d2fff3486637a6eef8f114bdcbce88a163.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/d6/d7/d6d7170d3a511bcc68be7a63c24c8db537950790.jpg?imwidth=2160',
            ],
          },
          {
            id: 2,
            color: '#3D4049',
            nameColor: 'xám',
            images: [
              'https://image.hm.com/assets/hm/72/58/7258acb258ada479a65f561e5e039a4bcb01151a.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/cd/d0/cdd0b620b9f03ec2bfec5cef98abb53974ccdef7.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/0f/90/0f9078be74158bff584fb4a7e4c96a43c08c6486.jpg?imwidth=2160',
            ],
          },
        ],
      },

      {
        id: 7,
        card_title: 'Áo Khoác Cardigan',
        card_price: 30000,
        discount: 45000,
        card_mota: 'Áo Khoác Cardigan, chất vải mềm mịn mặc hàng ngày thoải mái.',
        colors: [
          {
            id: 1,
            color: '#242B31',
            nameColor: 'nâu',
            images: [
              'https://image.hm.com/assets/hm/72/6f/726ff99a85e6175379564cd68abb93f2d6b95c7c.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/7b/b3/7bb3b82b2e39e065023403bc590ca0d718c88eef.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/86/75/867585fd319b7604d125f7f67e665f2aa66289f1.jpg?imwidth=2160',
            ],
          },
        ],
      },

      {
        id: 8,
        card_title: 'Quần jogger thể thao Loose Fit',
        card_price: 30000,
        discount: 45000,
        card_mota: 'Quần jogger, chất vải mềm mịn mặc hàng ngày thoải mái.',
        colors: [
          {
            id: 1,
            color: '#C2C7CD',
            nameColor: 'xám tiêu',
            images: [
              'https://image.hm.com/assets/hm/93/4a/934ac7f018dcc11ad73186553f226575babf959d.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/85/d6/85d68ab9e46c30afb6752d5befd31208e5ae8540.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/23/9e/239e9ec7d812a3b96461a6dfcc7f865802061151.jpg?imwidth=2160',
            ],
          },
        ],
      },

      {
        id: 9,
        card_title: 'Áo sơ mi Oxford Regular Fit',
        card_price: 30000,
        discount: 45000,
        card_mota: 'Áo sơ mi Oxford Regular Fit, chất vải thoáng mát mặc hàng ngày thoải mái.',
        colors: [
          {
            id: 1,
            color: '#0C2925',
            nameColor: 'đen nhạt',
            images: [
              'https://image.hm.com/assets/hm/8e/01/8e01b135c763ac720c33cf0974ed54d9dcc8212f.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/b0/db/b0db9ab776afc7f00efe524f03e49669a1b7b5c2.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/b0/5f/b05f214b07164eb95fa81478470ab5ec6925051e.jpg?imwidth=2160',
            ],
          },
          {
            id: 2,
            color: '#151517',
            nameColor: 'đen',
            images: [
              'https://image.hm.com/assets/hm/58/83/5883e8fe3c0d27f6b4b2aafc7f589c0a54b38696.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/a3/80/a38079606ec49a980702658b3e33c4487ba013bf.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/04/f1/04f12c233e16474e0f206db65696b635387038b6.jpg?imwidth=2160',
            ],
          },
        ],
      },

      {
        id: 10,
        card_title: 'Quần short cotton',
        card_price: 30000,
        discount: 45000,
        card_mota: 'Quần short cotton, chất vải mềm mịn mặc hàng ngày thoải mái.',
        colors: [
          {
            id: 1,
            color: '#989373',
            nameColor: 'xanh rêu',
            images: [
              'https://image.hm.com/assets/hm/b8/26/b8261eded2dbf4916976393c88a0172dc27b7417.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/7b/6d/7b6deaa8abbd3adb9ba7bfcbf420fb7fc56be5fb.jpg?imwidth=2160',
            ],
          },
          {
            id: 2,
            color: '#222127',
            nameColor: 'đen nhạt',
            images: [
              'https://image.hm.com/assets/hm/17/a8/17a87155faa5db01a3e97f58996f3133a94f7043.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/aa/1e/aa1e3a8ff6ccdc970e041057bc7c0af9537d849c.jpg?imwidth=2160',
              'https://image.hm.com/assets/hm/c8/d8/c8d8b42bbf5f4940d36ca8e54470b7483c68d99c.jpg?imwidth=2160',
            ],
          },
        ],
      },
    ];
    this.product.set(allProduct.find((product) => product.id === id));
  }

  // Lấy danh sách ảnh dựa trên màu đang chọn
  currentImages = computed(() => {
    const prod = this.product();
    if (prod && prod.colors[this.selectedColorIndex()]) {
      return prod.colors[this.selectedColorIndex()].images;
    }
    return [];
  });

  // Tính tổng tiền cho sản phẩm hiện tại đang xem
  currentTotal = computed(() => {
    const prod = this.product();
    return prod ? prod.card_price * this.quantity() : 0;
  });

  // Các hàm điều khiển
  selectColor(index: number) {
    this.selectedColorIndex.set(index);
    this.quantity.set(0); // Reset số lượng khi đổi màu (tùy chọn)
  }

  changeQuantity(amount: number) {
    const newQty = this.quantity() + amount;
    if (newQty >= 0) {
      this.quantity.set(newQty);
    }
  }
}
