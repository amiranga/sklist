import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ToastComponent } from '../shared/toast/toast.component';
import { SchoolService } from '../services/school.service';
import { SchoolGridComponent } from './school-grid.component';
import { of } from 'rxjs';

class SchoolServiceMock {
  mockSchools = [
    { name: 'School 1', age: 1, weight: 2 },
    { name: 'School 2', age: 3, weight: 4.2 },
  ];
  getSchools() {
    return of(this.mockSchools);
  }
}

describe('Component: Schools', () => {
  let component: SchoolGridComponent;
  let fixture: ComponentFixture<SchoolGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ SchoolGridComponent ],
      providers: [
        ToastComponent, FormBuilder,
        { provide: SchoolService, useClass: SchoolServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the page header text', () => {
    const el = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(el.textContent).toContain('Current schools (2)');
  });

  it('should display the text for no schools', () => {
    component.schools = [];
    fixture.detectChanges();
    const headerEl = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(headerEl.textContent).toContain('Current schools (0)');
    const tdEl = fixture.debugElement.query(By.css('td')).nativeElement;
    expect(tdEl.textContent).toContain('There are no schools in the DB. Add a new school below.');
  });

  it('should display current schools', () => {
    const tds = fixture.debugElement.queryAll(By.css('td'));
    expect(tds.length).toBe(8);
    expect(tds[0].nativeElement.textContent).toContain('School 1');
    expect(tds[1].nativeElement.textContent).toContain('1');
    expect(tds[2].nativeElement.textContent).toContain('2');
    expect(tds[4].nativeElement.textContent).toContain('School 2');
    expect(tds[5].nativeElement.textContent).toContain('3');
    expect(tds[6].nativeElement.textContent).toContain('4.2');
  });

  it('should display the edit and delete buttons', () => {
    const [btnEdit1, btnDelete1, btnEdit2, btnDelete2] = fixture.debugElement.queryAll(By.css('button'));
    expect(btnEdit1.nativeElement).toBeTruthy();
    expect(btnEdit1.nativeElement.textContent).toContain('Edit');
    expect(btnDelete1.nativeElement).toBeTruthy();
    expect(btnDelete1.nativeElement.textContent).toContain('Delete');
    expect(btnEdit2.nativeElement).toBeTruthy();
    expect(btnEdit2.nativeElement.textContent).toContain('Edit');
    expect(btnDelete2.nativeElement).toBeTruthy();
    expect(btnDelete2.nativeElement.textContent).toContain('Delete');
  });

  it('should display the edit form', async () => {
    component.isEditing = true;
    component.school = { name: 'School 1', address: '1', numberOfStudents: 2 };
    fixture.detectChanges();
    await fixture.whenStable();
    const tds = fixture.debugElement.queryAll(By.css('td'));
    expect(tds.length).toBe(1);
    const formEl = fixture.debugElement.query(By.css('form')).nativeElement;
    expect(formEl).toBeTruthy();
    const [inputName, inputAge, inputWeight] = fixture.debugElement.queryAll(By.css('input'));
    expect(inputName.nativeElement.value).toContain('School 1');
    expect(inputAge.nativeElement.value).toContain('1');
    expect(inputWeight.nativeElement.value).toContain('2');
    const [btnSave, btnCancel] = fixture.debugElement.queryAll(By.css('button'));
    expect(btnSave.nativeElement).toBeTruthy();
    expect(btnSave.nativeElement.textContent).toContain('Save');
    expect(btnCancel.nativeElement).toBeTruthy();
    expect(btnCancel.nativeElement.textContent).toContain('Cancel');
  });

});
