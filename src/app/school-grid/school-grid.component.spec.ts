import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ToastComponent } from '../shared/toast/toast.component';
import { SchoolService } from '../services/school.service';
import { SchoolGridComponent } from './school-grid.component';
import { of } from 'rxjs';

class SchoolServiceMock {
  mockSchools = [
    { "name": "school 1", "address": { "street": "a", "suburb": "b", "postcode": "c", "state": "d" }, "numberOfStudents": 3000 },
    { "name": "school 2", "address": { "street": "z", "suburb": "x", "postcode": "c", "state": "v" }, "numberOfStudents": 2000 }
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
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [SchoolGridComponent],
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
    expect(el.textContent).toContain('SCHOOLS (2)');
  });

  it('should display the text for no schools', () => {
    component.schools = [];
    fixture.detectChanges();
    const headerEl = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(headerEl.textContent).toContain('SCHOOLS (0)');
    const tdEl = fixture.debugElement.query(By.css('td')).nativeElement;
    expect(tdEl.textContent).toContain('No data found. Click "Add New" to insert school');
  });

  it('should display current schools', () => {
    const tds = fixture.debugElement.queryAll(By.css('td'));
    expect(tds.length).toBe(8);
    expect(tds[0].nativeElement.textContent).toContain('school 1');
    expect(tds[1].nativeElement.textContent).toContain('a, b, c, d');
    expect(tds[2].nativeElement.textContent).toContain('3000');
    expect(tds[4].nativeElement.textContent).toContain('school 2');
    expect(tds[5].nativeElement.textContent).toContain('z, x, c, v');
    expect(tds[6].nativeElement.textContent).toContain('2000');
  });

  it('should display the edit and delete buttons', () => {
    const [btnSrch, btnAdd, btnEdit1, btnDelete1, btnEdit2, btnDelete2] = fixture.debugElement.queryAll(By.css('button'));
    expect(btnSrch.nativeElement).toBeTruthy();
    expect(btnSrch.nativeElement.textContent).toContain('Search');
    expect(btnAdd.nativeElement).toBeTruthy();
    expect(btnAdd.nativeElement.textContent).toContain('Add');
    expect(btnEdit1.nativeElement).toBeTruthy();
    expect(btnEdit1.nativeElement.textContent).toContain('Edit');
    expect(btnDelete1.nativeElement).toBeTruthy();
    expect(btnDelete1.nativeElement.textContent).toContain('Delete');
    expect(btnEdit2.nativeElement).toBeTruthy();
    expect(btnEdit2.nativeElement.textContent).toContain('Edit');
    expect(btnDelete2.nativeElement).toBeTruthy();
    expect(btnDelete2.nativeElement.textContent).toContain('Delete');
  });

});
