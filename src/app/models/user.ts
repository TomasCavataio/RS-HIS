export interface User {
    id: string;
    name: string;
    firstSurname: string;
    secondSurname: string;
    gender: Gender;
    birthDate: Date;
    nif: string;
    address: Address;
    medicalBoardNumber: string;
    professionalType: Proffessions;
    insurances: Insurance[];
    nhc: string;
    checked: boolean;
}

export interface Address {
    city: string;
    street: string;
    streetNumber: string;
    doorNumber: string;
    postalCode: string;
}

export interface Insurance {
    insuranceCompanyName: string;
    insuranceType: string;
    cardNumber: string;
}

type Gender = 'Male' | 'Female' | 'Other';
type Proffessions = 'Doctor' | 'Nurse' | 'Administrative';

export interface UserResponse {
    users: User[];
}
