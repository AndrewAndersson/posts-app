import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getPosts() {
    this.http.get<{message: string, data: any}>('http://localhost:3000/api/posts')
        .pipe(map(res => {
          return res['data'].map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            }
          });
        }))
        .subscribe((postData) => {
          this.posts = postData;
          this.postsUpdated.next([...this.posts]);
        });
  }
  
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get('http://localhost:3000/api/posts/' + id);
  }

  addPost(title: string, content: string) {
    const newPost: Post = {
      id: null,
      title: title,
      content: content
    };
    this.http.post<{message: string, data: any}>('http://localhost:3000/api/posts', newPost)
        .pipe(map(res => {
          return {
              title: res['data'].title,
              content: res['data'].content,
              id: res['data']._id
          }; 
        }))
        .subscribe((post) => {
          this.posts.push(post);
          this.postsUpdated.next([...this.posts]);
          this.router.navigate(['/']);
        });
  }

  updatePost(id: string, title: string, content: string) {
    const updatingPost: Post = { id: id, title: title, content: content };
    this.http.put<{message: string, data: any}>(`http://localhost:3000/api/posts/${id}`, updatingPost)
        .subscribe(res => {
          const oldPostIndex = this.posts.findIndex(el => el.id === updatingPost.id);
          this.posts[oldPostIndex] = updatingPost;
          this.postsUpdated.next([...this.posts]);
          this.router.navigate(['/']);
        });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe(res => {
          this.posts = this.posts.filter(el => el.id !== postId);
          this.postsUpdated.next([...this.posts]);
        });
  }
}