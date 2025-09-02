import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  imports: [NgIf, NgFor,]
})
export class PaginationComponent {

  @Input() page = 1;
  @Input() size = 20;
  @Input() total = 0;

  @Output() pageChange = new EventEmitter<number>();

   Math = Math;

  get pages(): number[] {
    const last = Math.max(1, Math.ceil(this.total / this.size));
    const current = Math.min(this.page, last);
    const start = Math.max(1, current - 2);
    const end = Math.min(last, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

}

