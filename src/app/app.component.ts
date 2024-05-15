import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  user: any; // User data
  repositories: any[] = []; // Repositories data
  currentPage = 1;
  perPage = 10;

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.fetchUser('johnpapa');
    this.fetchRepos('johnpapa');
  }

  fetchUser(username: string) {
    this.apiService.getUser(username).subscribe(user => {
      this.user = user;
    });
  }

  fetchRepos(username: string) {
    this.apiService.getRepos(username, this.currentPage, this.perPage).subscribe(repos => {
      this.repositories = repos;
    });
  }

  nextPage() {
    this.currentPage++;
    this.fetchRepos('johnpapa');
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchRepos('johnpapa');
    }
  }

  updatePerPage(perPage: number) {
    this.perPage = perPage;
    this.fetchRepos('johnpapa');
  }
}
