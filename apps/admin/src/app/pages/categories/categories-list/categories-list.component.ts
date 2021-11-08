import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CategoriesService, Category} from '@nagiub/products';
import {ConfirmationService , MessageService} from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit , OnDestroy {

  categories:Category[] = []
  endSubject$ :Subject<any> = new Subject()  // $ => mean that is subject or observable
  constructor(private _CategoriesService:CategoriesService ,private _conf:ConfirmationService,
    private messageService: MessageService ,private _router:Router) { }

  ngOnInit(): void {
    this.getAll();
  }
  ngOnDestroy(){ // on destroy component see next value then make comp is completed to unsubscribe
    this.endSubject$.next();
    this.endSubject$.complete();
  }



getAll(){
  // pipe to get inside sth and do until this variable . 
  // another way to say in ondestroy getAll.unsubscribe for example
  this._CategoriesService.getCategories().pipe(takeUntil(this.endSubject$)).subscribe(cat =>{
    this.categories = cat
  })
}

deleteCategory(categoryId: string) {
  this._conf.confirm({
    message: 'Do you want to Delete this Category?',
    header: 'Delete Category',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this._CategoriesService.deleteCategory(categoryId).pipe(takeUntil(this.endSubject$)).subscribe(
        () => {
          this.getAll();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category is deleted!'
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Category is not deleted!'
          });
        }
      );
    }
  });
}

UpdateCategory(id:string){
this._router.navigateByUrl(`categories/form/${id}`)

}


}
