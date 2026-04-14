import { Component, input } from '@angular/core';

@Component({
  selector: 'app-post-item',
  standalone: false,
  templateUrl: './post-item.html',
  styleUrl: './post-item.css',
})
export class PostItem {
  post = input.required<any>()
}
