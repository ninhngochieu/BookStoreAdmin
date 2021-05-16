import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserData} from '../user-manager/user-manager.component';
import {OrderService} from './order.service';

const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

class Invoice {
  id: number;
  'createAt': '2021-05-12T18:36:15.362797';
  totalMoney: number;
  userId: number;
  user: null;
  invoiceDetails: '';
  statusId: number;
  status: '';
  isOnlinePayment: boolean;
  street_Address: string;
  cityAddressId: number;
  cityAddress: '';
  districtAddressId: number;
  districtAddress: '';
  wardId: number;
  ward: '';
  email: string;
  name: string;
  phone: number;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'address', 'date', 'totalmoney', 'status', 'action'];
  dataSource: MatTableDataSource<Invoice>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private users: Invoice[] =  [];

  constructor(private orderService: OrderService) {
    // Create 100 users
    this.orderService.getAllInvoice().subscribe(res => {
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
    // Assign the data to the data source for the table to render
  }

  ngAfterViewInit(): void {
    }

  ngOnInit(): void {
  }

  applyFilter($event: KeyboardEvent): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
