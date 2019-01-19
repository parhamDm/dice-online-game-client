import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MdbTablePaginationComponent, MdbTableService} from "angular-bootstrap-md";
import {UsermanagementService} from "../../../core/services/usermanagement.service";

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss']
})
export class UserCommentsComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;

  elements: any = [];
  previous: any = [];
  headElements = ['کاربرنظردهنده', 'کاربرامتیازگیرنده','امتیاز','کامنت','تاریخ کامنت','عملیات'];
  isAllComments:boolean=false;
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

    this.getCommsNotAll();

  }

  resetTable(){
    this.tableService.setDataSource(this.elements);
    this.elements = this.tableService.getDataSource();
    this.previous = this.tableService.getDataSource();
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.firstItemIndex = 0;
    this.lastItemIndex = this.mdbTablePagination.lastItemIndex;

    // this.mdbTablePagination.calculateFirstItemIndex();
    // this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  getCommsNotAll(){
    this.isAllComments=false;

    this.userService.getUserUnapprovedCommentsList().subscribe(model=>{
      this.elements= model.result;
      this.resetTable();
    });
  }
  getCommsAll(){
    this.isAllComments=true;
    this.userService.getUserCommentsList().subscribe(model=>{
      this.elements= model.result;
      for(let i=0;i<this.elements.length;i++){
        if(this.elements[i].status==0){
          this.elements[i].status='در انتظار';
        }
        if(this.elements[i].status==1){
          this.elements[i].status='تایید شده';
        }
        if(this.elements[i].status==2){
          this.elements[i].status='رد شده';
        }
      }
      this.resetTable();

    });
  }

  approveOrdeny(id:number,operation:number){ //1 approve //2 declined
    this.userService.changeStatusUser(id,operation).subscribe(model=>{
      this.getCommsNotAll();
    });

  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
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

  filterByUsername(){
    this.elements.sort(function (a,b) {
      return a.username > b.username;

    });
    this.resetTable();

  }

  filterByGamesDate(){
    this.elements.sort(function (a,b) {
      return a.date > b.date;
    });
    this.resetTable();

  }

}
