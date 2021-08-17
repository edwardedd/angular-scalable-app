import firestore from 'firebase/app'
export interface Job {
    title: string;
    salary: number;
    created: firestore.firestore.FieldValue;
    updated?: firestore.firestore.FieldValue;
}
