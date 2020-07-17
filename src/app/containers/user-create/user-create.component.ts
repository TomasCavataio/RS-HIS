import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm, FormArray } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true, displayDefaultIndicatorType: false }
  }]
})
export class UserCreateComponent implements OnInit {
  userForm: FormGroup;
  medicalForm: FormGroup;
  addressForm: FormGroup;
  isPatient: boolean;
  patient: string;
  maxDate = new Date();
  user = {};

  constructor(private http: HttpClient, private userService: UserService, private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.createForm();
    this.isPatient = true;
  }

  getShowSpinner(): boolean {
    return this.userService.showSpinner;
  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      firstSurname: ['', Validators.required],
      userType: ['', Validators.required],
      secondSurname: '', gender: '', birthDate: '', professionalType: '', nif: ''
    });
    this.addressForm = this.formBuilder.group({
      city: '', street: '', streetNumber: '', doorNumber: '', postalCode: ''
    });
    this.medicalForm = this.formBuilder.group({
      nhc: [''],
      medicalBoardNumber: [''],
      insurances: this.formBuilder.array([])
    });
  }

  insuranceList(): FormArray {
    return this.medicalForm.get('insurances') as FormArray;
  }

  addInsurance(): void {
    const insurances = this.medicalForm.get('insurances') as FormArray;
    insurances.push(this.formBuilder.group({
      insuranceCompanyName: '', cardNumber: '', insuranceType: ''
    })
    );
  }

  verifyUser(userType: string): void {
    if (userType === 'patient') {
      this.isPatient = true;
    } else {
      this.isPatient = false;
    }
  }

  validateUSer(): void {
    if (this.isPatient) {
      this.userForm.removeControl('professionalType');
      this.medicalForm.removeControl('medicalBoardNumber');
    } else {
      this.medicalForm.removeControl('nhc');
      this.medicalForm.removeControl('insuranceType');
    }
  }

  buildUser(form: FormGroup, attribute: string = ''): void {
    if (!attribute) {
      this.user = Object.assign(this.user, form.value);
    } else {
      this.user[attribute] = form.getRawValue();
    }
  }

  getUser(): void {
    this.buildUser(this.userForm);
    this.buildUser(this.addressForm, 'address');
    this.buildUser(this.medicalForm);
  }

  addUser(): void {
    this.validateUSer();
    this.getUser();
    this.userService.addUser(this.user).subscribe(() => this.router.navigate(['/users']));
  }

}
