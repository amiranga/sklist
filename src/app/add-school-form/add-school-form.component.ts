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

export class AddSchoolFormComponent{
  @Input() schools: School[];

  private _school;

  // use getter setter to define the property
  get school(): any {
    return this._school;
  }

  @Input()
  set school(val: any) {
    console.log('previous school = ', this._school);
    console.log('currently selected item=', val);
    console.log("isEditing",this.isEditing);
    if (val && this.isEditing) {
      var newFormData = this.formDeSerialize(val);
      console.log("patching",newFormData);
      this.addSchoolForm.patchValue(newFormData)
    }
    this._school = val;
  }

  @Input() isEditing: boolean;
  @Output() onCancel = new EventEmitter<boolean>();

  addSchoolForm: FormGroup = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      suburb: new FormControl('', Validators.required),
      postcode: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      numberOfStudents: new FormControl('', Validators.required)
  });

  constructor(private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent) { }


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
        street: formData.street,
        suburb: formData.suburb,
        postcode: formData.postcode,
        state: formData.state
      },
      numberOfStudents: formData.numberOfStudents
    };
  }
  formDeSerialize(school) {
    return {
      name: school.name,
      street: school.address.street,
      suburb: school.address.suburb,
      postcode: school.address.postcode,
      state: school.address.state,
      numberOfStudents: school.numberOfStudents
    };
  }
}
