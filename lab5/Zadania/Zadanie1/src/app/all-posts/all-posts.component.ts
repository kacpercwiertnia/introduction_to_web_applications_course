import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReadDataService } from '../read-data.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent {
  postAddingForm: FormGroup = this.formBuilder.group({
    title: new FormControl('', Validators.required),
    body: new FormControl('', [Validators.required, Validators.pattern("^.{50,500}$") ] )
  });
  constructor(private formBuilder : FormBuilder, private readDataService: ReadDataService) { }
  allPosts: any[] = []

  ngOnInit(): void {
    this.readDataService.getPosts().subscribe(res => this.allPosts=res)
  }

  onSubmit(){
    let dataToSend = {
      "userId": 0,
      "id": this.allPosts.length+1,
      "title": this.postAddingForm.value.title,
      "body": this.postAddingForm.value.body
    }

    this.readDataService.sendPost(JSON.stringify(dataToSend)).subscribe(res => this.allPosts.push(dataToSend))
    this.postAddingForm.reset();
  }
}