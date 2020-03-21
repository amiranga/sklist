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
      declarations: [AddSchoolFormComponent],
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

  it('should display header text', async () => {
    component.showModal = true;
    fixture.detectChanges();
    await fixture.whenStable();
    //FIXME remove settimeout and findout a way to wait till modal open
    setTimeout(function () {
      const el = fixture.debugElement.query(By.css('h4')).nativeElement;
      expect(el.textContent).toContain('Edit School');
    }, 1000);
  });

  it('should display the add form', async () => {
    component.showModal = true;
    fixture.detectChanges();
    await fixture.whenStable();
    //FIXME remove settimeout and findout a way to wait till modal open
    setTimeout(function () {
      const formEl = fixture.debugElement.query(By.css('form')).nativeElement;
      expect(formEl).toBeTruthy();
      const [inputName, inputStreet, inputSuburb, inputPostCode, inputState, inputNOS] = fixture.debugElement.queryAll(By.css('input'));
      expect(inputName.nativeElement).toBeTruthy();
      expect(inputStreet.nativeElement).toBeTruthy();
      expect(inputSuburb.nativeElement).toBeTruthy();
      expect(inputPostCode.nativeElement).toBeTruthy();
      expect(inputState.nativeElement).toBeTruthy();
      expect(inputNOS.nativeElement).toBeTruthy();
      const btnAdd = fixture.debugElement.query(By.css('button')).nativeElement;
      expect(btnAdd).toBeTruthy();
    }, 1000);
  });

});
