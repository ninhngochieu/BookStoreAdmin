import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, OnChanges {
  constructor() {}

  @Output() changePage = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pageData.currentValue) {
      this.paginatorData = changes.pageData.currentValue;
    }
  }

  ngOnInit(): void {}

  paginatorData: Object;

  @Input()
  pageData: Object;

  selectPage(page): void {
    if(page === this.paginatorData['current_page']) return;
    this.changePage.emit(page);
  }
}
