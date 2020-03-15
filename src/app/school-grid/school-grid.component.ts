import { Component, OnInit } from '@angular/core';

import { SchoolService } from '../services/school.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { School } from '../shared/models/school.model';

@Component({
  selector: 'app-school-grid',
  templateUrl: './school-grid.component.html',
  styleUrls: ['./school-grid.component.scss']
})
export class SchoolGridComponent implements OnInit {

  school = new School();
  schools: School[] = [];
  isLoading = true;
  isEditing = false;
  isAdding = false;

  constructor(private schoolService: SchoolService,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getSchools();
  }

  getSchools() {
    this.schoolService.getSchools().subscribe(
      data => this.schools = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  enableEditing(school: School) {
    this.isEditing = true;
    this.school = school;
  }

  enableAdding() {
    this.isAdding = true;
  }

  cancelEditing() {
    this.isEditing = false;
    this.isAdding = false;
    this.school = new School();
    this.getSchools();
  }
  
  deleteSchool(school: School) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.schoolService.deleteSchool(school).subscribe(
        () => {
          this.schools = this.schools.filter(elem => elem._id !== school._id);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
