import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductDetailModifyService} from './product-detail-modify.service';
import {isEmpty, UploadService} from '../../core/utils';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-product-detail-modify',
  templateUrl: './product-detail-modify.component.html',
  styleUrls: ['./product-detail-modify.component.scss']
})
export class ProductDetailModifyComponent implements OnInit {
  delete: any;
  submit: any;
  preUrl: any;
  listCategory: any;
  bookForm: any;
  listAuthor: any;
  uploadService = new UploadService();
  uploadService1 = new UploadService();
  uploadService2 = new UploadService();
  uploadService3 = new UploadService();
  uploadService4 = new UploadService();
  private isUpdate: any;
  private id: string;

  constructor(private productDetailModifyService: ProductDetailModifyService,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initCategory();
    this.initAuthor();
    this.initEditBook();
    this.submit = this.createOrUpdateBook.bind(this);
  }
  private createOrUpdateBook(): any{

    const formValue = this.bookForm.value;
    const formData = new FormData();

    for (const key in formValue) {
      if (formValue[key] === '') {
        continue;
      }
      if (!formValue[key]) {
        continue;
      }
      if (key === 'MainImage') {
        continue;
      }
      if (key === 'Image1') {
        continue;
      }
      if (key === 'Image2') {
        continue;
      }
      if (key === 'Image3') {
        continue;
      }
      if (key === 'Image4') {
        continue;
      }
      formData.append(key, formValue[key]);
      if (this.uploadService.imagePath) {
        formData.append('MainImage', this.uploadService.imagePath);
        console.log(this.uploadService.imagePath);
      }
      if (this.uploadService1.imagePath) {
        formData.append('Image1', this.uploadService1.imagePath);
        console.log(this.uploadService1.imagePath);
      }
      if (this.uploadService2.imagePath) {
        formData.append('Image2', this.uploadService2.imagePath);
        console.log(this.uploadService2.imagePath);
      }
      if (this.uploadService3.imagePath) {
        formData.append('Image3', this.uploadService3.imagePath);
        console.log(this.uploadService3.imagePath);
      }
      if (this.uploadService4.imagePath) {
        formData.append('Image4', this.uploadService4.imagePath);
        console.log(this.uploadService4.imagePath);
      }
    }
    if (this.isUpdate){
      formData.append('id', this.id);
      this.productDetailModifyService.updateBook(formData);
    }else {
      this.productDetailModifyService.createBook(formData);
    }
  }
  private initForm(): void {
    this.bookForm = this.formBuilder.group({
      BookName: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      Price: new FormControl('', Validators.required),
      CategoryId: new FormControl('', Validators.required),
      AuthorId: new FormControl('', Validators.required),
      Quantity: new FormControl('', Validators.required),
      MainImage: new FormControl(''),
      Image1: new FormControl(''),
      Image2: new FormControl(''),
      Image3: new FormControl(''),
      Image4: new FormControl(''),
    });
  }

  private initCategory(): any {
    this.productDetailModifyService.getAllCategory();
    this.productDetailModifyService.category.subscribe(res => {
      this.listCategory = res;
    });
  }

  private initAuthor(): any {
    this.productDetailModifyService.getAllAuthor();
    this.productDetailModifyService.author.subscribe(res => {
      this.listAuthor = res;
    });
  }

  private initEditBook(): any {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    let data: any;
    if(this.id){
      this.productDetailModifyService.getBookById(this.id);
    }
    this.productDetailModifyService.book.subscribe(res => {
      data = res;
      if (isEmpty(data)) { return; }
      else { this.isUpdate = true; }
      this.bookForm.setValue({
        BookName: data.bookName,
        Description: data.description,
        Price: data.price,
        CategoryId: data.categoryId,
        AuthorId: data.authorId,
        Quantity: data.quantity,
        MainImage: data.mainImage,
        Image1: data.image1,
        Image2: data.image2,
        Image3: data.image3,
        Image4: data.image4,
      });
    });
  }
}
