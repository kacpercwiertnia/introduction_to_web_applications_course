import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json; charset=UTF-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReadDataService {

  constructor(private http: HttpClient) { }


  getPosts(): Observable<JSON[]>{
    return this.http.get<JSON[]>("http://jsonplaceholder.typicode.com/posts")
  }

  getPhotos(): Observable<JSON[]>{
    return this.http.get<JSON[]>("http://jsonplaceholder.typicode.com/photos")
  }

  getPhotoUrlById(id: number): Observable<any>{
    return this.http.get<any>("http://jsonplaceholder.typicode.com/photos/" + id.toString())
  }

  sendPost(body: string): Observable<any>{
    return this.http.post<any>("http://jsonplaceholder.typicode.com/posts", body, httpOptions)
  }

}