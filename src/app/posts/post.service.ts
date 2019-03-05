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
  private postsUpdated = new Subject<{posts: Post[], postsLength: number}>();
  private dataPosts: {posts: Post[], postsLength: number};

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getPosts(perPage: number, page: number) {
    const queryParams =  `?pagesize=${perPage}&page=${page}`;
    this.http.get<{message: string, data: any, dataLength: number}>('http://localhost:3000/api/posts' + queryParams)
        .pipe(map(res => {
          return {posts: res['data'].map(post => {
                      return {
                        title: post.title,
                        content: post.content,
                        id: post._id,
                        imagePath: post.imagePath
                      }
                    }),
                  postsLength: res['dataLength']};
        }))
        .subscribe((postData) => {
          this.posts = postData.posts;
          this.dataPosts = {
            posts: [...this.posts],
            postsLength: postData.postsLength
         }
          this.postsUpdated.next({...this.dataPosts});
        });
  }
  
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get('http://localhost:3000/api/posts/' + id);
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http.post<{message: string, data: any}>('http://localhost:3000/api/posts', postData)
        .pipe(map(res => {
          return {
              title: res['data'].title,
              content: res['data'].content,
              id: res['data'].id,
              // imagePath: res['data'].imagePath
          }; 
        }))
        .subscribe((post: Post) => {
          this.dataPosts.posts.push(post);
          this.dataPosts.postsLength += 1;
          this.postsUpdated.next({...this.dataPosts});
          this.router.navigate(['/']);
        });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof(image) === 'object') {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }
    this.http.put<{message: string, data: any}>(`http://localhost:3000/api/posts/${id}`, postData)
        .subscribe(res => {
          const oldPostIndex = this.posts.findIndex(el => el.id === id);
          const updatingPost: Post = {
            id: id,
            title: res['data'].title,
            content: res['data'].content,
            imagePath: res['data'].imagePath
          }
          this.dataPosts.posts[oldPostIndex] = updatingPost;
          this.postsUpdated.next({...this.dataPosts});
          this.router.navigate(['/']);
        });
  }

  deletePost(postId: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + postId);
  }
}
