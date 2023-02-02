import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReadDataService } from '../read-data.service';

@Component({
  selector: 'app-single-photos',
  templateUrl: './single-photos.component.html',
  styleUrls: ['./single-photos.component.css']
})
export class SinglePhotosComponent {
  constructor(private route: ActivatedRoute, private singlePhotoService: ReadDataService) { }
  private subscription: Subscription | undefined

  id: number = -1
  photoUrl: string = ""
  ngOnInit(): void {
     this.subscription = this.route.params.subscribe(params => {
          this.id = params['id']
        })
      this.singlePhotoService.getPhotoUrlById(this.id).subscribe(res => this.photoUrl=res.url)
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }

}
