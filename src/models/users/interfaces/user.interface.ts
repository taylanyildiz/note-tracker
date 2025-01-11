import { UserRole } from "../enums";

export interface IUser {
    role?: UserRole;
    status?: boolean;
    firstName: string;
    lastName: String;
    email: string;
    password: string;
}