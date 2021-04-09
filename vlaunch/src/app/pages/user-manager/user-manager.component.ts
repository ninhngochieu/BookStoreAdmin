import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpService} from '../../core/http.service';
import {UserManagerService} from './user-manager.service';
import {User} from '../../models/user';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})

export class UserManagerComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'username', 'name', 'email', 'avatar', 'phone', 'roleName', 'addresses', 'isAccess'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private Users: User[];

  constructor(private userManagerService: UserManagerService) {
    // Create 100 users
    this.userManagerService.getAllUserInfo();
    this.userManagerService.user.subscribe(res => {
      this.Users = res;
      // console.log(this.Users);
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.Users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  ngAfterViewInit(): void {
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {

  }
}
