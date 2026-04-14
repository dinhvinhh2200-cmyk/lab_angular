import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// USER
export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

// POST
export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://gorest.co.in/public/v2/users'
  private postUrl = 'https://gorest.co.in/public/v2/posts'
  private apiKey = 'c89f48aaaf1fa9874a9166e1d7779a082c17cba5f9fe0372e86122812b1e34bf'

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.apiKey}`,
    'Content-type': 'application/json'
  })

  constructor(private http: HttpClient) {}
    getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.headers });
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, { headers: this.headers });
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, { headers: this.headers });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  // ================= POST =================

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl, { headers: this.headers });
  }

  // 🔥 NEW: Lấy toàn bộ bài viết của 1 user
  getPostsByUser(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${this.apiUrl}/${userId}/posts`,
      { headers: this.headers }
    );
  }
}