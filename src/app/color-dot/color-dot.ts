import { Component , input } from '@angular/core';

@Component({
  selector: 'app-color-dot',
  standalone: false,
  templateUrl: './color-dot.html',
  styleUrl: './color-dot.css',
})
export class ColorDot {
  color = input.required<string>()
  isActive = input(false)
}
