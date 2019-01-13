import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  
  @Output() createdPostEvent = new EventEmitter<Post>();
  constructor() { }

  ngOnInit() {
  }

  addNewPost(postForm: NgForm) {
    if(postForm.invalid) return;
    const post: Post = {
      title: postForm.value.title,
      content: postForm.value.content
    };
    this.createdPostEvent.emit(post);
  }

}
