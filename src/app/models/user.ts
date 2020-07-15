export interface User {
    id: string;
    name: string;
    firstSurname: string;
    secondSurname: string;
    gender: string;
    birthDate: Date;
    nif: string;
    address: {
        city: string;
        street: string;
        streetNumber: string;
        doorNumber: string;
        postalCode: string;
    };
    medicalBoardNumber: string;
    professionalType: string;
    nhc: string;
    insuranceCompanyName: string;
    insuranceType: string;
    cardNumber: string;
    checked: boolean;
}

export interface UserResponse {
    users: User[];
}
