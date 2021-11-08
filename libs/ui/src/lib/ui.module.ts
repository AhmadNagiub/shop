import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanarComponent } from './components/banar/banar.component';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './components/gallery/gallery.component';

@NgModule({
    imports: [CommonModule,ButtonModule],
    declarations: [
      BanarComponent,
      GalleryComponent
    ],
    exports: [
      BanarComponent,
      GalleryComponent
    ]
})
export class UiModule {}
