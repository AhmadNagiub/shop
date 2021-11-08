import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from '../../models/category';
// there is a problem that called component before it initalization and fixed in in (tsconfig.app.json)
@Component({
  selector: 'nagiub-cat-banar',
  templateUrl: './cat-banar.component.html',
  styles: [
  ]
})
export class CatBanarComponent implements OnInit , OnDestroy {
  endSubs$:Subject<any> = new Subject();
  categoriesList:Category[] = []
  constructor(private _categoriesService:CategoriesService) { }

  ngOnInit(): void {
    this.getCategory()
  }

  getCategory(){

    this._categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(categories =>{
        this.categoriesList = categories
    })
  }
ngOnDestroy(){
  this.endSubs$.next();
  this.endSubs$.complete();
}

}
