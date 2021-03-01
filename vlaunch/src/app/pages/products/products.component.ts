import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'category', 'status', 'price'];
  dataSource: MatTableDataSource<Product>;
  selection = new SelectionModel<Product>(true, []);

  public productData: Object;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProductList();
    this.productService.productData$.subscribe((data) => {
      this.dataSource = new MatTableDataSource<Product>(data['results']);
      this.productData = data;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event, type: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productService.params[type] = filterValue;
    this.productService.getProductList();
  }

  onSelectRow(product) {
    if (product && product.code) {
      this.router.navigate(['dashboard', 'product', product.id]);
    }
  }

  changePage(page: number): void {
    this.productService.getProductList(page);
  }
}
