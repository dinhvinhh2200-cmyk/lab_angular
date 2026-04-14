import { PostItem } from '../post-item/post-item';
import { ApiService } from './../../../api.service';


import { Component, inject, signal, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList implements OnInit {
  private apiService = inject(ApiService)

  // Signal lưu danh sách bài viết
  posts = signal<any[]>([])
  isLoading = signal<boolean>(false)

  ngOnInit() {
    this.loadUserPosts(8433300)
  }

  loadUserPosts(userId: number) {
    this.isLoading.set(true)
    this.apiService.getPostsByUser(userId).subscribe({
      next: (data) => {
        this.posts.set(data);
        this.isLoading.set(false)
      },
      error: (err) => {
        console.error('Lỗi khi load posts:', err)
        this.isLoading.set(false)
      }
    })
  }
}
