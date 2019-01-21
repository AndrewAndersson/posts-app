import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(
    private http: HttpClient
  ) { }

  getPosts() {
    this.http.get<{message: string, data: Post[]}>('http://localhost:3000/api/posts')
        .subscribe((res) => {
          this.posts = res['data'];
          this.postsUpdated.next([...this.posts]);
        });
  }
  
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const newPost: Post = {
      id: null,
      title: title,
      content: content
    };
    this.http.post<{message: string, data: Post}>('http://localhost:3000/api/posts', newPost)
        .subscribe((res) => {
          this.posts.push(res['data']);
          this.postsUpdated.next([...this.posts]);
        });
  }
}
