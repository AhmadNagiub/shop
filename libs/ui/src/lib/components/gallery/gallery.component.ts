import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nagiub-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {

  @Input() images: string[] | undefined;
  
  selectedImageUrl: string | undefined;

  ngOnInit(): void {
      this.selectedImageUrl = this.images?.[0];
  }

  changeSelectedImage(imageUrl:string){
    this.selectedImageUrl = imageUrl;
  }


}
