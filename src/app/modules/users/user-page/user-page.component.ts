import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MdbTablePaginationComponent, MdbTableService} from "angular-bootstrap-md";
import {UsermanagementService} from "../../../core/services/usermanagement.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;

  elements: any = [];
  previous: any = [];
  headElements = ['تعداد بازی ها', 'میانگین امتیاز', 'نام','نام کاربری','آنلاین','پروفایل'];

  firstItemIndex;
  lastItemIndex;

  constructor(private tableService: MdbTableService,
              private cdRef: ChangeDetectorRef,
              private userService: UsermanagementService) {
  }

  ngOnInit() {

    // for (let i = 1; i <= 15; i++) {
    //   this.elements.push({ id: i.toString(), first: 'User ' + i, last: 'Name ' + i, handle: 'Handle ' + i });
    // }
    this.userService.getUserlist().subscribe(model=>{
      this.elements= model;
    });

    this.tableService.setDataSource(this.elements);
    this.elements = this.tableService.getDataSource();
    this.previous = this.tableService.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(6);
    this.firstItemIndex = this.mdbTablePagination.firstItemIndex;
    this.lastItemIndex = this.mdbTablePagination.lastItemIndex;

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  filterByScore(){
    this.elements.sort(function (a,b) {
      return a.userOverAllScore < b.userOverAllScore;
    })
  }

  filterByGamesPlayed(){
    this.elements.sort(function (a,b) {
      return a.totalPlays < b.totalPlays;
    })
  }

  filterByGamesWon(){
    this.elements.sort(function (a,b) {
      return a.gamesWon < b.gamesWon;
    })
  }
}
