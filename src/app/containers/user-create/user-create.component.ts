import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm, FormArray } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true, displayDefaultIndicatorType: false }
  }]
})
export class UserCreateComponent implements OnInit {
  ALPHANUMERIC_TRIMMED_REGEX = '^[a-zÀ-úA-Z0-9_]+( [a-zÀ-úA-Z0-9_]+)*$';
  ALPHA_TRIMMED_REGEX = '^[a-zÀ-úA-Z_]+( [a-zÀ-úA-Z_]+)*$';
  NIF_AND_PASSPORT_REGEX = '[A-Za-z]{3}[0-9]{6}[A-Za-z]?$|[0-9]{8}[A-Za-z]';
  userForm: FormGroup;
  medicalForm: FormGroup;
  addressForm: FormGroup;
  isPatient: boolean;
  patient: string;
  maxDate = new Date();
  user = {};
  isMobile = false;

  constructor(
    private http: HttpClient, private userService: UserService,
    private router: Router, private formBuilder: FormBuilder, public snackbar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.createForm();
    this.isPatient = true;
    if (window.screen.width <= 425) {
      this.isMobile = true;
    }
  }

  getShowSpinner(): boolean {
    return this.userService.showSpinner;
  }

  openSnackBar(message: string): void {
    const snackRef = this.snackbar.open(message, 'Close', {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.ALPHA_TRIMMED_REGEX)]],
      firstSurname: ['', [Validators.required, Validators.pattern(this.ALPHA_TRIMMED_REGEX)]],
      userType: ['', Validators.required],
      secondSurname: '', gender: '', birthDate: '', professionalType: '',
      nif: ['']
    });
    this.addressForm = this.formBuilder.group({
      city: '', street: '', streetNumber: '', doorNumber: '', postalCode: ''
    });
    this.medicalForm = this.formBuilder.group({
      nhc: ['', [Validators.pattern(this.ALPHANUMERIC_TRIMMED_REGEX)]],
      medicalBoardNumber: ['', [Validators.pattern(this.ALPHANUMERIC_TRIMMED_REGEX)]],
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
    if (userType === 'Patient') {
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
    this.userService.addUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);
      this.openSnackBar('User Created Successfully');
    });
  }

}
