import { User } from './user';

export interface Patient extends User {
    nhc: string;
    insurances: Insurance[];
}

export interface Insurance {
    insuranceCompanyName: string;
    insuranceType: InsuranceType;
    cardNumber: string;
}

type InsuranceType = 'Health' | 'Family' | 'Dental';
