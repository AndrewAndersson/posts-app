import { Injectable } from '@angular/core';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];

  constructor() { }

  getPosts() {
    return [...this.posts];
  }

  addPost(title: string, content: string) {
    const newPost = {
      title: title,
      content: content
    };
    this.posts.push(newPost);
  }
}
