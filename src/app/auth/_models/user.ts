export class User {
    id: number;
    email: string;
    password: string;
    fullName: string;
}

export interface UserData {
    name: string;
    email: string;
    token: string;
    roles: string;
}