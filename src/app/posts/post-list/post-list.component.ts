import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  // posts = [
  //   { title: 'first Post', content: 'some post content' },
  //   { title: 'second Post', content: 'some second post content' },
  //   { title: 'third Post', content: 'some third post content' },
  // ];
  posts: Post[];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
  }

  @Input('getPosts')
    set getPostsEmit(getPosts) {
      this.posts = getPosts;
    }

}
