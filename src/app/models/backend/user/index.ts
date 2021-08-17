import firestore from "firebase/app";
// import firestore from "firebase/app"
import { Employee, Recruiter } from './roles';

export * from './roles';
export interface User {
    uid: string;
    name: string;
    photoURL: string;
    email: string;
    country: string;
    about?: string;
    roleId: string;
    role: Employee | Recruiter;
    created: firestore.firestore.FieldValue;
    updated?: firestore.firestore.FieldValue;
}
