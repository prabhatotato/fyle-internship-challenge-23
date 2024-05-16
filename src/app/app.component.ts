import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  user: any; // User data
  loadingUser: boolean = false; // Initialize loading state
  loadingRepos:boolean = false; //  loading flag for repositories
  searchPerformed:boolean = false; // flag to track if a search has been performed
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
    this.loadingUser = true; // Set loading state to true before API call
    
    this.apiService.getUser(username).subscribe(user => {
        this.user = user;
        this.loadingUser = false; // Set loading state to false after API call is completed
        
        // Reset repositories when fetching a new user
        this.repositories = [];
        this.searchPerformed = true; // Mark that a search has been performed
        this.loadingRepos = true;
        
        this.fetchRepos(username); // Call fetchRepos after fetching user data
        this.errorMessage = ''; // Reset error message
        this.userFetchError = false; // Reset user fetch error flag
      },
      error => {
        console.error('Error fetching user:', error);
        // Reset user and repositories on error
        this.loadingUser = false; // Make sure to set loading state to false on error as well
        this.loadingRepos = false;

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
        this.loadingRepos = false;
        this.errorMessage = ''; // Reset error message
        this.repoFetchError = false; // Reset repository fetch error flag
      },
      error => {
        console.error('Error fetching repositories:', error);
        // Reset repositories on error
        this.loadingRepos = false;
        this.repositories = [];
        this.errorMessage = 'Error fetching repositories';
        this.repoFetchError = true; // Set repository fetch error flag
      }

    );
  }

  nextPage() {
    this.loadingRepos = true;
    this.fetchRepos(this.user.login);
    if(this.repositories.length > 0){
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadingRepos = true;
      this.fetchRepos(this.user.login);
    }
  }

  updatePerPage(perPage: number) {
    this.perPage = perPage;
    this.currentPage = 1; // Reset current page to 1 when changing items per page
    this.loadingRepos = true;
    this.fetchRepos(this.user.login); // Fetch data for the first page with the new items per page
  }
}
