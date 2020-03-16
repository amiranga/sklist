import { Component, EventEmitter, Input, Output, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SchoolService } from '../services/school.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { School } from '../shared/models/school.model';

@Component({
  selector: 'app-add-school-form',
  templateUrl: './add-school-form.component.html',
  styleUrls: ['./add-school-form.component.scss']
})

export class AddSchoolFormComponent {
  @Input() schools: School[];

  private _school;
  get school(): any {
    return this._school;
  }
  @Input()
  set school(val: any) {
    if (val && this.isEditing) {
      var newFormData = this.formDeSerialize(val);
      this.addSchoolForm.patchValue(newFormData)
    }
    this._school = val;
  }

  @Input() isEditing: boolean;

  private _showModal;
  get showModal(): boolean {
    return this._showModal;
  }
  @Input()
  set showModal(val: boolean) {
    if (val) {
      this.openModal(this.modalContent);
      this._showModal = val;
    }
  }

  @ViewChild("content") modalContent: TemplateRef<any>;

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
    public toast: ToastComponent,
    private modalService: NgbModal) { }


  addSchool(school: School) {
    if (this.isEditing && school) {
      var updated = this.formSerialize(this.addSchoolForm.value);
      updated._id = school._id;
      this.editSchool(updated);
    } else {
      this.schoolService.addSchool(this.formSerialize(this.addSchoolForm.value)).subscribe(
        res => {
          this.schools.push(res);
          this.addSchoolForm.reset();
          this.toast.setMessage('school added successfully.', 'success');
          this.closeModal();
        },
        error => console.log(error)
      );
    }
  }

  editSchool(school: School) {
    this.schoolService.editSchool(school).subscribe(
      () => {
        this.school = school;
        this.toast.setMessage('school edited successfully.', 'success');
        this.closeModal();
      },
      error => console.log(error)
    );
  }

  formSerialize(formData): School {
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
  formDeSerialize(school: School) {
    return {
      name: school.name,
      street: school.address.street,
      suburb: school.address.suburb,
      postcode: school.address.postcode,
      state: school.address.state,
      numberOfStudents: school.numberOfStudents
    };
  }

  openModal(content) {
    this.modalService.open(content, { keyboard: false, backdrop: "static" });
  }

  closeModal() {
    this.isEditing = false;
    this.school = new School();
    this.modalService.dismissAll();
    this.onCancel.emit(true);
  }

}
