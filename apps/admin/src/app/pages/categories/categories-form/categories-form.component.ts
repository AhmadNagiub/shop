import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@nagiub/products';
import {MessageService} from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit , OnDestroy {

  categoryForm!: FormGroup;
  isSubmit=false;
  editMode=false;
  currentCategoryId='';
  endSubject$:Subject<any> = new Subject()
  constructor(private fb:FormBuilder , private _CategoriesService:CategoriesService ,private _activateRoute:ActivatedRoute,
    private messageService: MessageService ,private location:Location) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name : ['' , [Validators.required]],
      icon : ['' , [Validators.required]],
      color : ['#FFF' ]
    })

    this._checkEditMode();
  }
  ngOnDestroy(){ 
    this.endSubject$.next();
    this.endSubject$.complete();
  }

  
  get catForm(){
    return this.categoryForm.controls
  }

  getData(){
    this.isSubmit = true
    if(this.categoryForm.invalid)
    {
      return ;
    }
    const category: Category = {
      name:this.catForm.name.value,
      icon:this.catForm.icon.value,
      color:this.catForm.color.value
    }

    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }

  }
  
  _addCategory(category:Category){

    this._CategoriesService.createCategory(category).pipe(takeUntil(this.endSubject$)).subscribe((category:Category) =>{
      this.messageService.add({severity:'success', summary:'Success', detail:`category ${category.name}  is created`});
      timer(2000).toPromise().then(() =>{
        this.location.back();
      })
    } , () =>{
      this.messageService.add({severity:'error', summary:'Error', detail:'category can\'t created'});

    }) 
  }
  _updateCategory(category:Category){
    this._CategoriesService.updateCategory(category , this.currentCategoryId).pipe(takeUntil(this.endSubject$)).subscribe((category:Category) =>{
      this.messageService.add({severity:'success', summary:'Success', detail:`category ${category.name}  is updated`});
      timer(2000).toPromise().then(() =>{
        this.location.back();
      })
    } , () =>{
      this.messageService.add({severity:'error', summary:'Error', detail:'category can\'t updated'});

    }) 
  }

  _checkEditMode(){
    this._activateRoute.params.pipe(takeUntil(this.endSubject$)).subscribe((param) =>{
      if(param.id)
      {
        this.editMode = true
        this.currentCategoryId = param.id;
        this._CategoriesService.getCategory(param.id).pipe(takeUntil(this.endSubject$)).subscribe((category) => {
          this.catForm.name.setValue(category.name);
          this.catForm.icon.setValue(category.icon);
          this.catForm.color.setValue(category.color);
        });
      }
    })
  }
  onCancle() {
    this.location.back();
  }

}
