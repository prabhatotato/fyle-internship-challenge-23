import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repo',
  template: `
    <div *ngFor="let repo of repositories">
      <h3>{{ repo.name }}</h3>
      <p>{{ repo.description }}</p>
      <!-- Add more details as needed -->
    </div>
  `,
  styles: []
})
export class RepoComponent {
  @Input() repositories!: any[]; // Non-null assertion operator
}
