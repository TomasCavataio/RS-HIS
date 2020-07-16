import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
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
  isPacient: boolean;
  pacient: string;
  maxDate = new Date();
  user = {};

  constructor(private http: HttpClient, private userService: UserService, private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.createForm();
    this.isPacient = true;
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
      insuranceCompanyName: '', cardNumber: '', insuranceType: ''
    });
  }

  verifyUser(userType: string): void {
    if (userType === 'pacient') {
      this.isPacient = true;
    } else {
      this.isPacient = false;
    }
  }

  formToUser(form: FormGroup, attribute: string = ''): void {
    if (!attribute) {
      this.user = Object.assign(this.user, form.value);
    } else {
      this.user[attribute] = form.getRawValue();
    }
  }

  getUser(): void {
    this.formToUser(this.userForm);
    this.formToUser(this.addressForm, 'address');
    this.formToUser(this.medicalForm);
  }

  addUser(): void {
    this.getUser();
    this.userService.addUser(this.user).subscribe(() => this.router.navigate(['/users']));
  }

}
