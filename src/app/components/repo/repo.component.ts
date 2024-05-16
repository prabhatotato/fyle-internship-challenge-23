import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repo',
  templateUrl:'./repo.component.html' ,
  styles: []
})
export class RepoComponent {
  @Input() repositories!: any[]; // Non-null assertion operator
  @Input() loading: boolean = false; // New loading input
  
}
