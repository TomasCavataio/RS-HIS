import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

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
  constructor(private http: HttpClient, private userService: UserService, private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.createForm();
    this.isPacient = true;
    this.userForm.controls.userType.setValue('pacient');
  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      userType: ['', Validators.required],
      secondSurname: '', gender: '', birthday: '', professionalType: ''
    });
    this.addressForm = this.formBuilder.group({
      city: '', street: '', streetNumber: '', doorNumber: '', postalCode: ''
    });
    this.medicalForm = this.formBuilder.group({
      nhc: ['', Validators.nullValidator],
      medicalBoard: ['', Validators.nullValidator],
      insuranceCompanyName: '', nif: '', cardNumber: '', insuranceType: ''
    });
  }

  verifyUser(): void {
    if (this.isPacient === true) {
      this.isPacient = false;
    } else {
      this.isPacient = true;
    }
  }

  // tslint:disable-next-line: max-line-length
  add(userForm: FormGroup, addressForm: FormGroup, medicalForm: FormGroup): void {
    console.log(userForm.value, addressForm.value, medicalForm.value);
    // this.userService.addUser(user).subscribe(() => this.router.navigate(['/users']));
  }

}



/* const user = {
  name,
  firstSurname: surname,
  secondSurname: secondSurname,
  gender,
  birthDate: birthday,
  professionalType: professionalType,
  city,
  postalCode: postal,
  street,
  streetNumber: streetNumber,
  doorNumber: doorNumber,
  medicalBoardNumber: medicalBoard,
  nhc,
  insuranceCompanyName: insuranceCompany,
  nif,
  cardNumber: cardNumber,
  insuranceType: insuranceType
}; */
