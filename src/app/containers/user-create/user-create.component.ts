import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm, FormArray } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
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
      secondSurname: ['', [Validators.pattern(this.ALPHA_TRIMMED_REGEX)]],
      gender: '', birthDate: '', professionalType: '',
      nif: ['']
    });
    this.addressForm = this.formBuilder.group({
      city: ['', [Validators.pattern(this.ALPHANUMERIC_TRIMMED_REGEX)]],
      street: ['', [Validators.pattern(this.ALPHANUMERIC_TRIMMED_REGEX)]],
      streetNumber: ['', [Validators.pattern(this.ALPHANUMERIC_TRIMMED_REGEX)]],
      doorNumber: ['', [Validators.pattern(this.ALPHANUMERIC_TRIMMED_REGEX)]],
      postalCode: ['', [Validators.pattern(this.ALPHANUMERIC_TRIMMED_REGEX)]]
    });
    this.medicalForm = this.formBuilder.group({
      nhc: ['', [Validators.pattern(this.ALPHANUMERIC_TRIMMED_REGEX)]],
      medicalBoardNumber: ['', [Validators.pattern(this.ALPHANUMERIC_TRIMMED_REGEX)]],
      insurances: this.formBuilder.array([])
    });
    this.userForm.controls['userType'].valueChanges.subscribe(selection => {
      if (selection === 'Patient') {
        this.medicalForm.controls['nhc'].setValidators(Validators.required);
        this.medicalForm.controls['nhc'].updateValueAndValidity();
      } else {
        this.medicalForm.controls['nhc'].setValidators(null);
        this.medicalForm.controls['nhc'].updateValueAndValidity();
      }
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
    this.medicalForm.reset();
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
    this.getUser();
    this.userService.addUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);
      this.openSnackBar('User Created Successfully');
    });
  }

}
