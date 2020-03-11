import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SchoolService } from '../services/school.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { School } from '../shared/models/school.model';

@Component({
  selector: 'app-add-school-form',
  templateUrl: './add-school-form.component.html',
  styleUrls: ['./add-school-form.component.scss']
})

export class AddSchoolFormComponent implements OnInit {
  @Input() schools: School[];

  addSchoolForm: FormGroup;
  name = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  numberOfStudents = new FormControl('', Validators.required);

  constructor(private schoolService: SchoolService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.addSchoolForm = this.formBuilder.group({
      name: this.name,
      address: this.address,
      numberOfStudents: this.numberOfStudents
    });
  }

  addSchool() {
    this.schoolService.addSchool(this.addSchoolForm.value).subscribe(
      res => {
        this.schools.push(res);
        this.addSchoolForm.reset();
        this.toast.setMessage('school added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

}
