import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  isLoading: boolean = false;

  posts: Post[] = [];
  totalPosts = 10;
  postsPerPage = 5;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postService.getPostUpdateListener()
        .pipe(takeUntil(this.destroy$))
        .subscribe((posts: Post[]) => {
          this.isLoading = false;
          this.posts = posts;
        });
  }

  onDeletePost(postId: string) {
    this.postService.deletePost(postId);
  }

  onPageEvent(data: PageEvent) {

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
