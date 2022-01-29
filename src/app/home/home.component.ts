import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { windowCount } from 'rxjs';
import { PostModel } from '../post-model.model';
import { CrudService } from '../services/crud.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formValue !: FormGroup
  postData : any
  postObj : PostModel = new PostModel();
  status: boolean = false

  constructor(public formBuilder: FormBuilder, public crud: CrudService){ 

  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      title: ['',],
      body: ['',]
    })
    this.getPosts()
  }
  modalStatus(){
    this.status = !this.status
  }


  getPosts(){
    this.crud.getPosts().subscribe(res=>{
      this.postData = res
      console.log(this.postData)
    })
  }
  postPostDetail(){
    this.postObj.title = this.formValue.value.title;
    this.postObj.body = this.formValue.value.body

    this.crud.postPost(this.postObj).subscribe(res =>{
      console.log(res)
      this.formValue.reset()
      window.location.reload()
    })
  }
  deletePost(post : any){
    this.crud.deletePost(post.id).subscribe(res=>{
      this.getPosts()
    })
  }

  onEdit(post: any){

    this.modalStatus()
    this.postObj.id = post.id
    this.formValue.controls['title'].setValue(post.title)
    this.formValue.controls['body'].setValue(post.title)
  }

  updatePost(){
    this.postObj.title = this.formValue.value.title;
    this.postObj.body = this.formValue.value.body

    this.crud.putPost(this.postObj, this.postObj.id)
    window.location.reload()
  }
}
