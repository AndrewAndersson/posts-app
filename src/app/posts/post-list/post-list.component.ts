import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

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
    this.posts = this.postService.getPosts();
    this.postService.getPostUpdateListener()
        .pipe(takeUntil(this.destroy$))
        .subscribe((posts: Post[]) => {
          this.posts = posts;
        });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
