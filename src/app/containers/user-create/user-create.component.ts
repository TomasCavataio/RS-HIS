import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
      userType: ['', Validators.required]
    });
    this.medicalForm = this.formBuilder.group({
      nhc: ['', Validators.nullValidator],
      medicalBoard: ['', Validators.nullValidator]
    });
  }

  verifyUser(): void {
    if (this.isPacient === true) {
      this.isPacient = false;
    } else { this.isPacient = true; }
  }

  // tslint:disable-next-line: max-line-length
  add(name: string, surname: string, secondSurname: string, gender: string, birthday: Date, professionalType: string, city: string, postal: string, street: string, streetNumber: string, doorNumber: string, medicalBoard: string, nhc: string, insuranceCompany: string, nif: string, cardNumber: string, insuranceType: string): void {
    const user = {
      name,
      first_surname: surname,
      second_surname: secondSurname,
      gender,
      birth_date: birthday,
      professional_type: professionalType,
      city,
      postal_code: postal,
      street,
      street_number: streetNumber,
      door_number: doorNumber,
      medical_board_number: medicalBoard,
      nhc,
      insurance_company_name: insuranceCompany,
      nif,
      card_number: cardNumber,
      insurance_type: insuranceType
    };
    this.userService.addUser(user).subscribe(() => this.router.navigate(['/users']));
  }

}
