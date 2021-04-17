import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpService} from '../../core/http.service';
import {UserManagerService} from './user-manager.service';
import {Role, User} from '../../models/user';
import {Environment} from '@angular/compiler-cli/src/ngtsc/typecheck/src/environment';
import {environment} from '../../../environments/environment';
import {tryCatch} from 'rxjs/internal-compatibility';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {AuthService} from '../../modules/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
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
  env = environment;
  private Roles: Role[];

  constructor(private userManagerService: UserManagerService, private matSnackBar: MatSnackBar) {
    // Create 100 users
    this.userManagerService.getAllUserInfo();
    this.userManagerService.getAllRole();

    this.userManagerService.user.subscribe(res => {
      this.Users = res;
      this.initDatatable();
    });

    this.userManagerService.role.subscribe(res => {
      this.Roles = res;
      console.log(this.Roles);
    });
  }

  private initDatatable(): any {
    this.dataSource = new MatTableDataSource(this.Users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  convertRoleId(roleViewModel: Role): number {
    try{
      return roleViewModel.id;
    }catch (err){
      console.log(err);
    }
  }

  changeStatus($event: MatSlideToggleChange, id): any {
    const status = $event.checked;
    const formData = new FormData();
    formData.append('id', id);
    formData.append('isAccess', status.toString());
    this.userManagerService.UpdateStatusAndRole(id, formData);
    this.userManagerService.statusAndRole.subscribe(res => {
      if (res.success){
        this.matSnackBar.open(res.data, 'Close', {
          duration: 2000
        });
      }else {
        this.matSnackBar.open(res.error_message, 'Close', {
          duration: 2000
        });
      }
    });
  }

  changeRole(value, id): any {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('roleId', value);
    this.userManagerService.UpdateStatusAndRole(id, formData);
    this.userManagerService.statusAndRole.subscribe(res => {
      if (res.success){
        this.matSnackBar.open(res.data, 'Close', {
          duration: 2000
        });
      }else {
        this.matSnackBar.open(res.error_message, 'Close', {
          duration: 2000
        });
      }
    });
  }
}
