export interface UserAccount {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    expiresIn: number;
}
