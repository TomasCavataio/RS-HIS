export interface User {
    name: string;
    first_surname: string;
    second_surname: string;
    gender: string;
    birth_date: Date;
    nif: string;
    street: string;
    street_number: string;
    door_number: string;
    postal_code: string;
    city: string;
    medical_board_number: string;
    professional_type: string;
    nhc: string;
    insurance_company_name: string;
    insurance_type: string;
    card_number: string;
}

export interface UserResponse {
    users: User[];
}
