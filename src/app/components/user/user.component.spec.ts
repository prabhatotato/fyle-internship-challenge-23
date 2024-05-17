import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not display user data when loading is true', () => {
    component.loading = true;
    component.user = { avatar_url: 'test-avatar-url', name: 'Test User', bio: 'Test Bio', followers: 10 };
    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(By.css('.animate-pulse'));
    const userElement = fixture.debugElement.query(By.css('img'));

    expect(loadingElement).toBeTruthy();
    expect(userElement).toBeFalsy();
  });

  it('should display user data when loading is false and user is defined', () => {
    component.loading = false;
    component.user = { avatar_url: 'test-avatar-url', name: 'Test User', bio: 'Test Bio', followers: 10 };
    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(By.css('.animate-pulse'));
    const userElement = fixture.debugElement.query(By.css('img'));

    expect(loadingElement).toBeFalsy();
    expect(userElement).toBeTruthy();
  });

  it('should not display user data when loading is false and user is not defined', () => {
    component.loading = false;
    component.user = null;
    fixture.detectChanges();

    const userElement = fixture.debugElement.query(By.css('img'));

    expect(userElement).toBeFalsy();
  });
});
