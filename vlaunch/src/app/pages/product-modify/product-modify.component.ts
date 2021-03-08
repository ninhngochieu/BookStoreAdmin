import {Input, OnInit} from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AlertService} from '../../core/alert.service';
import {ProductModifyService} from './product-modify.service';
import {BookProfile} from '../../models/book';
import {environment} from '../../../environments/environment';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-product-modify',
  templateUrl: './product-modify.component.html',
  styleUrls: ['./product-modify.component.scss']
})
export class ProductModifyComponent implements OnInit, AfterViewInit{
  dataSource: MatTableDataSource<BookProfile>;
  env = environment;

  constructor(private alertService: AlertService, private productModifyService: ProductModifyService, private matSnackBar: MatSnackBar) {
    // const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));
    // Assign the data to the data source for the table to render
    this.productModifyService.getAllBook();
    this.productModifyService.book.subscribe(res => {
      this.books = res;
      this.dataSource = new MatTableDataSource(this.books);
    });
    }
  displayedColumns: string[] = [
    'id',
    'bookName',
    'price',
    'quantity',
    'publicationDate',
    'sku',
    'description',
    'mainImage',
    'categoryName',
    'authorName',
    'Action'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private books: BookProfile[];

  ngOnInit(): void {
    console.log(this.books);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);
  }
  applyFilter(event: Event): any{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeStatus($event: MatSlideToggleChange, id): any {
    const statusBook = !$event.checked;
    this.productModifyService.changeStatusBook(id, statusBook);
    if (!statusBook){
      this.matSnackBar.open('Đã kích hoạt', 'Close', {
        duration: 3000
      });
    }else{
      this.matSnackBar.open('Đã vô hiệu hoá',  'Close', {
        duration: 3000
      });
    }
  }
}
