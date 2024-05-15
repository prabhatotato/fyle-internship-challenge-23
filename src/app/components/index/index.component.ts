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
    console.log('nextpage clicked ', this.nextPage);
    
    this.nextPage.emit();
  }

  onPrevPage() {
    console.log('nextprevPage clicked ', this.prevPage);
    this.prevPage.emit();
  }

  onUpdatePerPage() {
    console.log('UpdatePerPage clicked ', this.perPage);
    this.updatePerPage.emit(this.perPage);
  }
}
