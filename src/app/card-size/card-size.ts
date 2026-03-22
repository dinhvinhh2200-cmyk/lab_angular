import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card-size',
  standalone: false,
  templateUrl: './card-size.html',
  styleUrl: './card-size.css',
})
export class CardSize {
  isActive = input(false)
}
