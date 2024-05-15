import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {
  @Output() searchUser = new EventEmitter<string>();
  username: string = '';

  search() {
    if (this.username.trim() !== '') {
      this.searchUser.emit(this.username);
    }
  }
}
