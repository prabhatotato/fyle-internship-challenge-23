import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule], // Import FormsModule for ngModel
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the input field and search button', () => {
    const inputElement = fixture.debugElement.query(By.css('input[name="username"]'));
    const buttonElement = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(inputElement).toBeTruthy();
    expect(buttonElement).toBeTruthy();
  });

  

  it('should emit searchUser event with the correct username when form is submitted', () => {
    spyOn(component.searchUser, 'emit');
    component.username = 'john';
    
    const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
    formElement.dispatchEvent(new Event('submit'));

    expect(component.searchUser.emit).toHaveBeenCalledWith('john');
  });

  it('should not emit searchUser event when username is empty', () => {
    spyOn(component.searchUser, 'emit');
    component.username = '   '; // Spaces only
    
    const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
    formElement.dispatchEvent(new Event('submit'));

    expect(component.searchUser.emit).not.toHaveBeenCalled();
  });
});
