import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: []
})
export class IndexComponent {
  @Output() nextPage = new EventEmitter<void>();
  @Output() prevPage = new EventEmitter<void>();
  @Output() updatePerPage = new EventEmitter<number>();
  @Input() currentPage: number = 1;
  @Input() perPage: number = 10;

  onNextPage() {
    this.nextPage.emit();
  }

  onPrevPage() {
    this.prevPage.emit();
  }

  onUpdatePerPage() {
    this.updatePerPage.emit(this.perPage);
  }
}
