import { Component } from '@angular/core';
import { ReadDataService } from '../read-data.service';

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
  styleUrls: ['./all-photos.component.css']
})
export class AllPhotosComponent {
  allPhotos: any[] = []

  constructor(private dataService: ReadDataService){
    this.dataService.getPhotos().subscribe(res => this.allPhotos=res)
  }
}
