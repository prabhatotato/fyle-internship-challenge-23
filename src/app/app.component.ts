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

  errorMessage: string = '';
  userFetchError: boolean = false;
repoFetchError: boolean = false;

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    
  }

  fetchUser(username: string) {
    this.apiService.getUser(username).subscribe(user => {
        this.user = user;

        // Reset repositories when fetching a new user
        this.repositories = [];

        this.fetchRepos(username); // Call fetchRepos after fetching user data
        this.errorMessage = ''; // Reset error message
        this.userFetchError = false; // Reset user fetch error flag
      },
      error => {
        console.error('Error fetching user:', error);
        // Reset user and repositories on error
        this.user = null;
        this.repositories = [];
        this.errorMessage = 'Invalid user name';
        this.userFetchError = true; // Set user fetch error flag
      }
    );
  }

  fetchRepos(username: string) {
        this.apiService.getRepos(username, this.currentPage, this.perPage).subscribe(repos => {
        this.repositories = repos;
        this.errorMessage = ''; // Reset error message
        this.repoFetchError = false; // Reset repository fetch error flag
      },
      error => {
        console.error('Error fetching repositories:', error);
        // Reset repositories on error
        this.repositories = [];
        this.errorMessage = 'Error fetching repositories';
        this.repoFetchError = true; // Set repository fetch error flag
      }

    );
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
