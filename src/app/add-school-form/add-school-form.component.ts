import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
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
  @Input() school: School;
  @Input() isEditing: boolean = false;
  @Output() onCancel = new EventEmitter<boolean>();

  addSchoolForm: FormGroup;
  name = new FormControl('', Validators.required);
  address_1 = new FormControl('', Validators.required);
  address_2 = new FormControl('', Validators.required);
  address_3 = new FormControl('', Validators.required);
  address_4 = new FormControl('', Validators.required);
  numberOfStudents = new FormControl('', Validators.required);

  constructor(private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent) { }

  ngOnInit(): void {
    this.addSchoolForm = this.formBuilder.group({
      name: this.name,
      address_1: this.address_1,
      address_2: this.address_2,
      address_3: this.address_3,
      address_4: this.address_4,
      numberOfStudents: this.numberOfStudents
    });
  }

  addSchool(school: School) {
    if (this.isEditing && school) {
      this.editSchool(school);      
    } else {
      console.log("form val", this.addSchoolForm.value);
      this.schoolService.addSchool(this.formSerialize(this.addSchoolForm.value)).subscribe(
        res => {
          this.schools.push(res);
          this.addSchoolForm.reset();
          this.toast.setMessage('school added successfully.', 'success');
          this.backToGrid();
        },
        error => console.log(error)
      );
    }
  }

  backToGrid() {
    this.isEditing = false;
    this.school = new School();
    this.onCancel.emit(true);
  }

  editSchool(school: School) {
    this.schoolService.editSchool(school).subscribe(
      () => {
        this.school = school;
        this.toast.setMessage('item edited successfully.', 'success');
        this.backToGrid();
      },
      error => console.log(error)
    );
  }

  formSerialize(formData) {
    return {
      name: formData.name,
      address: {
        street: formData.address_1,
        suburb: formData.address_2,
        postcode: formData.address_3,
        state: formData.address_4
      },
      numberOfStudents: formData.numberOfStudents
    };
  }

}