import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { PostModel } from '../post-model.model'

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  posts: PostModel[] = [];
  postId: any;
  post: any
  constructor(public route: ActivatedRoute, public router: Router, public http: HttpClient, public crud: CrudService) { }

  ngOnInit(): void {
    this.downloadPosts()
  }

  downloadPosts(){
    this.route.paramMap.subscribe((params : ParamMap)=>{
      this.postId = params.get('postID')
    })

    this.crud.getPost(this.postId).subscribe(res=>{
      this.post = res
      console.log(this.post)
    })
  }
}
