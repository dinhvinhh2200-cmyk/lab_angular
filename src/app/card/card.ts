import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  
  listImg = input<string[]>()

  card_price = input.required<number>()
  card_title = input.required<string>()
  card_mota = input.required<string>() 
  quantily = input<number>(5)
    
  colorList = [
    { id: 1, color: '#0D1D3E' },
    { id: 2, color: '#FA3137' },
    { id: 3, color: '#73BB7B' },
    { id: 4, color: '#FCBB43' },
    { id: 5, color: '#DB9559' },
  ];
  selectColorId: number = this.colorList.length;

  sizeList  = [
    {id: 1, size: '45*53'},
    {id: 2, size: '42*40'},
    {id: 3, size: '40*40'},
    {id: 4, size: '35*49'}
  ]
  selectSizeId: number = 1;
}
