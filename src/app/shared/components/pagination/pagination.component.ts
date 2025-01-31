import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-pagination',
  imports: [ MatPaginatorModule,],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() totalRecords: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 1;

  @Output() pageChange = new EventEmitter<{ pageIndex: number, pageSize: number }>();

  onPageChange(event: PageEvent): void { // Use PageEvent here
    this.pageChange.emit({
      pageIndex: event.pageIndex + 1,  // Adjust for 1-based index
      pageSize: event.pageSize
    });
  }

}
