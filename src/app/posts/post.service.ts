import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
        });
  }

  deletePost(postId: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + postId)
                .subscribe(res => {
                  this.posts = this.posts.filter(el => el.id !== postId);
                  this.postsUpdated.next([...this.posts]);
                });
  }
}
