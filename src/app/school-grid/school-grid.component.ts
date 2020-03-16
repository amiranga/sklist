import { Component, OnInit, Input } from '@angular/core';

import { SchoolService } from '../services/school.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { School } from '../shared/models/school.model';
import { scheduled } from 'rxjs';

@Component({
  selector: 'app-school-grid',
  templateUrl: './school-grid.component.html',
  styleUrls: ['./school-grid.component.scss']
})
export class SchoolGridComponent implements OnInit {

  school = new School();
  schools: School[] = [];
  isLoading: boolean = true;
  isEditing: boolean = false;
  isAdding: boolean = false;
  filter: string;

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

  filterSchools() {
    var keyword = this.filter;
    console.log("keyword",keyword);
    if (keyword && keyword.trim().length) {
      this.schools = this.schools.filter(school =>
        school.name.includes(keyword) ||
        school.address.state.includes(keyword) ||
        school.address.street.includes(keyword) ||
        school.address.suburb.includes(keyword)
      );
    } else {
      this.getSchools();
    }
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
    this.filter = "";
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
