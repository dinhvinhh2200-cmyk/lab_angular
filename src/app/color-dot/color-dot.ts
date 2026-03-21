import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-color-dot',
  standalone: false,
  templateUrl: './color-dot.html',
  styleUrl: './color-dot.css',
})
export class ColorDot {
  @Input() color:string = '#000'
  @Input() isActive: boolean = false
}
