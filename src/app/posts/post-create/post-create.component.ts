import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  newPost = '';
  textInput = 'Enter text...';

  constructor() { }

  ngOnInit() {
  }

  addNewPost() {
    this.newPost = this.textInput;
  }

}
