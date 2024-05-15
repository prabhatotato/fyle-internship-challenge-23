import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly BASE_URL = 'https://api.github.com/users';

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/${githubUsername}`)
      .pipe(
        tap(data => console.log('Fetched user data:', data)),
        catchError(this.handleError)
      );
  }

  getRepos(githubUsername: string, page: number = 1, perPage: number = 10): Observable<any> {
    const url = `${this.BASE_URL}/${githubUsername}/repos?page=${page}&per_page=${perPage}`;
    return this.httpClient.get<any>(url)
      .pipe(
        tap(data => console.log('Fetched repositories:', data)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
