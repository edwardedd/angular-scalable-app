import { User, Employee, Recruiter } from '@app/models/backend/user';

export interface EmailPasswordCredentials {
  email: string;
  password: string;
}