export interface User {
    uid: string;
    email: string;
    name: string;
    role: string;
    trips: [];
    banned: boolean;
}