import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public http: HttpClient) { }


  getPosts(){
    return this.http.get('http://localhost:3000/posts')
    .pipe(map((res =>{
      return res
    })))
  }
  getPost(id: number){
    return this.http.get('http://localhost:3000/posts/' + id)
    .pipe(map((res=>{
      return res
    })))
  }
  postPost(data: any){
    return this.http.post<any>('http://localhost:3000/posts', data)
    .pipe(map((res: any)=>{
      return res
    }))
  }
  deletePost(id: number){
    return this.http.delete<any>('http://localhost:3000/posts/' + id)
    .pipe(map((res: any)=>{
      return res
    }))
  }
  putPost(data: any, id: number){
    return this.http.put<any>('http://localhost:3000/posts/'+id, data).subscribe(()=>{

    })
  }
}
