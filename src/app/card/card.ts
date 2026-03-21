import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  listImg: any[] = [
    'https://down-br.img.susercontent.com/file/br-11134207-7r98o-lx1lxv4u66xe22',
    'https://down-br.img.susercontent.com/file/br-11134207-7r98o-lx1lxv4u4scyff',
    'https://serenaestantes.com.br/wp-content/uploads/Rack-Para-Discos-De-Vinil-EV-397-1.webp',
  ];
  card_price: string = '15,000';
  card_title: string = 'Bed Side Table';
  card_mota: string =  'A beautiful side table that will perfectly fit your lovely bed room.With space for your books, lamps and electronic devices.';
    
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
