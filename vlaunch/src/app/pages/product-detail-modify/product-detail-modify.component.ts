import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductDetailModifyService} from './product-detail-modify.service';
import {UploadService} from '../../core/utils';

@Component({
  selector: 'app-product-detail-modify',
  templateUrl: './product-detail-modify.component.html',
  styleUrls: ['./product-detail-modify.component.scss']
})
export class ProductDetailModifyComponent implements OnInit {
  delete: any;
  submit: any;
  preUrl: any;
  disabledSubmit: any;
  listCategory: any;
  bookForm: any;
  listAuthor: any;
  uploadService = new UploadService();

  constructor(private productDetailModifyService: ProductDetailModifyService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initCategory();
    this.initAuthor();
  }

  private initForm(): void {
    this.bookForm = new FormGroup({
      BookName: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      Price: new FormControl('', Validators.required),
      CategoryId: new FormControl('', Validators.required),
      AuthorId: new FormControl('', Validators.required),
      Quantity: new FormControl('', Validators.required),
      SKU: new FormControl('', Validators.required),
      MainImage: new FormControl('', Validators.required)
    });
  }

  private initCategory(): any {
    this.productDetailModifyService.getAllCategory();
    this.productDetailModifyService.category.subscribe(res => {
      this.listCategory = res;
      console.log(res);
    });
  }

  private initAuthor(): any {
    this.productDetailModifyService.getAllAuthor();
    this.productDetailModifyService.author.subscribe(res => {
      this.listAuthor = res;
    });
  }
}
