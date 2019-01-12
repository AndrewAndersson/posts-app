import { Component, OnInit } from '@angular/core';

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
  posts = [];

  constructor() { }

  ngOnInit() {
  }

}
