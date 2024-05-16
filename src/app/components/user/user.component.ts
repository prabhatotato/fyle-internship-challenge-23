import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent {
  @Input() user: any;
  @Input() loading: boolean = false; //  input property to control loading state
}
