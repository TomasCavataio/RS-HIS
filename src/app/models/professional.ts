import { User } from './user';

export interface Professional extends User {
    medicalBoardNumber: string;
    professionalType: Proffessions;
}

type Proffessions = 'Doctor' | 'Nurse' | 'Administrative';
