import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId: string;
  isLoading: boolean = false;
  post: Post;
  form: FormGroup;
  constructor(
    public postService: PostService,
    public route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      content: [null, Validators.compose([Validators.required])],
      image: [null, Validators.required]
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId)
            .subscribe((res: any) => {
              this.isLoading = false;
              this.post = {id: res._id, title: res.title, content: res.content};
              this.form.setValue({
                title: this.post.title,
                content: this.post.content
              });
            });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const postImage = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: postImage});
    this.form.get('image').updateValueAndValidity();
    console.log(postImage);
    console.log(this.form);
     
  }

  onSavePost() {
    if(this.form.invalid) return;
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content);
    }
    this.form.reset();
  }

}
