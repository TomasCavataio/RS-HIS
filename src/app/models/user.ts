export interface User {
    _id: string;
    name: string;
    firstSurname: string;
    secondSurname: string;
    gender: Gender;
    birthDate: Date;
    nif: string;
    address: Address;
    userType: UserType;
}

export interface Address {
    city: string;
    street: string;
    streetNumber: string;
    doorNumber: string;
    postalCode: string;
}

type Gender = 'Male' | 'Female' | 'Other';
type UserType = 'Patient' | 'Professional';
