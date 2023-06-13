import { Roles } from "./roles.enum";

export interface IUpdateUserPayload {
    email: string;
    userId: string;
    roles: Roles[];
}