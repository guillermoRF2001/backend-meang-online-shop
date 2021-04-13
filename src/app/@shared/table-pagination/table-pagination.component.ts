import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { IInfoPage, IResultData } from '@core/interfaces/result-data.interface';
import { Component, Input, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { TablePaginationService } from './table-pagination.service';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {
  @Input() query: DocumentNode;
  @Input() context: object;
  @Input() itemsPage = 20;
  @Input() include = true;
  @Input() resultData: IResultData;
  @Input() tableColumns: Array<ITableColumns> = undefined;
  infoPage: IInfoPage;
  data$: Observable<any>;
  constructor(private service: TablePaginationService) { }

  ngOnInit(): void {
    if (this.query === undefined){
      throw new Error('Query is undefined, please add.');
    }
    if (this.resultData === undefined){
      throw new Error('resultData is undefined, please add.');
    }
    if (this.tableColumns === undefined){
      throw new Error('tableColumns is undefined, please add.');
    }
    this.infoPage = {
      page: 1,
      pages: 1,
      itemsPage: this.itemsPage,
      total: 1
    };
    this.loadData();
  }

  loadData() {
    const variables = {
      page: this.infoPage.page,
      itemsPage: this.infoPage.itemsPage,
      include: this.include
    };
    this.data$ = this.service.getCollectionData(this.query, variables, {}).pipe(
      map((result: any) => {
        const data = result[this.resultData.definitionKey];
        this.infoPage.pages = data.info.pages;
        this.infoPage.total = data.info.total;
        return data[this.resultData.listKey];
      }
    ));
  }

  changePage() {
    this.loadData();
  }
}
