import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUser', () => {
    it('should return user data from the API and cache it', () => {
      const mockUser = { login: 'john', name: 'John Doe' };
      const username = 'john';

      service.getUser(username).subscribe(user => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);

      // Verify caching behavior
      service.getUser(username).subscribe(user => {
        expect(user).toEqual(mockUser);
      });

      httpMock.expectNone(`https://api.github.com/users/${username}`);
    });

    it('should handle error response', () => {
      const username = 'invalidUser';
      service.getUser(username).subscribe(
        () => fail('expected an error'),
        error => {
          expect(error).toBe('Something went wrong; please try again later.');
        }
      );

      const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
      expect(req.request.method).toBe('GET');
      req.flush('Something went wrong', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getRepos', () => {
    it('should return repositories data from the API and cache it', () => {
      const mockRepos = [{ id: 1, name: 'Repo 1' }, { id: 2, name: 'Repo 2' }];
      const username = 'john';
      const page = 1;
      const perPage = 10;
      const cacheKey = `${username}|${page}|${perPage}`;

      service.getRepos(username, page, perPage).subscribe(repos => {
        expect(repos).toEqual(mockRepos);
      });

      const req = httpMock.expectOne(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockRepos);

      // Verify caching behavior
      service.getRepos(username, page, perPage).subscribe(repos => {
        expect(repos).toEqual(mockRepos);
      });

      httpMock.expectNone(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`);
    });

    it('should handle error response', () => {
      const username = 'invalidUser';
      const page = 1;
      const perPage = 10;

      service.getRepos(username, page, perPage).subscribe(
        () => fail('expected an error'),
        error => {
          expect(error).toBe('Something went wrong; please try again later.');
        }
      );

      const req = httpMock.expectOne(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`);
      expect(req.request.method).toBe('GET');
      req.flush('Something went wrong', { status: 500, statusText: 'Server Error' });
    });
  });
});
