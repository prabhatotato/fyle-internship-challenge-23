import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly BASE_URL = 'https://api.github.com/users';

  private userCache = new Map<string, any>();
  private repoCache = new Map<string, any[]>();
  
  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string): Observable<any> {

    if (this.userCache.has(githubUsername)) {
      return of(this.userCache.get(githubUsername));
    }

    return this.httpClient.get(`${this.BASE_URL}/${githubUsername}`)
      .pipe(
        tap(data => {
          this.userCache.set(githubUsername, data);
        }),
        catchError(this.handleError)
      );
  }

  getRepos(githubUsername: string, page: number = 1, perPage: number = 10): Observable<any> {
    const cacheKey = `${githubUsername}|${page}|${perPage}`;

    if (this.repoCache.has(cacheKey)) {
      return of(this.repoCache.get(cacheKey));
    }

    const url = `${this.BASE_URL}/${githubUsername}/repos?page=${page}&per_page=${perPage}`;
    return this.httpClient.get<any>(url)
      .pipe(
        tap(data => {
          this.repoCache.set(cacheKey, data)
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
