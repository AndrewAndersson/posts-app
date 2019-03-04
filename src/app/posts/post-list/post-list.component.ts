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
  totalPosts = 0;
  postsPerPage = 2;
  currenPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currenPage);
    this.postService.getPostUpdateListener()
        .pipe(takeUntil(this.destroy$))
        .subscribe((postsData: {posts: Post[], postsLength: number}) => {
          this.isLoading = false;
          this.totalPosts = postsData.postsLength;
          this.posts = postsData.posts;
        });
  }

  onDeletePost(postId: string) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currenPage);
    });
  }

  onPageEvent(data: PageEvent) {
    this.isLoading = true;
    this.currenPage = data.pageIndex + 1;
    this.postsPerPage = data.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currenPage);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
