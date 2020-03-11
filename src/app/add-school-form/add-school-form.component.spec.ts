import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { ToastComponent } from '../shared/toast/toast.component';
import { SchoolService } from '../services/school.service';
import { AddSchoolFormComponent } from './add-school-form.component';

class SchoolServiceMock { }

describe('Component: AddSchoolForm', () => {
  let component: AddSchoolFormComponent;
  let fixture: ComponentFixture<AddSchoolFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ AddSchoolFormComponent ],
      providers: [
        ToastComponent, FormBuilder,
        { provide: SchoolService, useClass: SchoolServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSchoolFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header text', () => {
    const el = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(el.textContent).toContain('Add new school');
  });

  it('should display the add form', () => {
    const formEl = fixture.debugElement.query(By.css('form')).nativeElement;
    expect(formEl).toBeTruthy();
    const [inputName, inputAge, inputWeight] = fixture.debugElement.queryAll(By.css('input'));
    expect(inputName.nativeElement).toBeTruthy();
    expect(inputAge.nativeElement).toBeTruthy();
    expect(inputWeight.nativeElement).toBeTruthy();
    expect(inputName.nativeElement.value).toBeFalsy();
    expect(inputAge.nativeElement.value).toBeFalsy();
    expect(inputWeight.nativeElement.value).toBeFalsy();
    const btnAdd = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(btnAdd).toBeTruthy();
  });

});
