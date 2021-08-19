import { User } from '@app/models/backend';
import { Action, createAction, props } from '@ngrx/store';
import { EmailPasswordCredentials } from './user.models';

export enum Types {
    INIT = '[User] Init: Start',
    INIT_AUTHORIZED = '[User] Init: Authorized',
    INIT_UNAUTHORIZED = '[User] Init: Unauthorized',
    INIT_ERROR = '[User] Init: Error',

    SIGN_IN_EMAIL = '[User] Sign In with email: Start',
    SIGN_IN_EMAIL_SUCCESS = '[User] Sign In with email: Success',
    SIGN_IN_EMAIL_ERROR = '[User] Sign In with email: Error',

    SIGN_UP_EMAIL = '[User] Sign Up with email: Start',
    SIGN_UP_EMAIL_SUCCESS = '[User] Sign Up with email: Success',
    SIGN_UP_EMAIL_ERROR = '[User] Sign Up with email: Error',

    SIGN_OUT = '[User] Sign Out: Start',
    SIGN_OUT_SUCCESS = '[User] Sign Out: Success',
    SIGN_OUT_ERROR = '[User] Sign Out: Error',
    TESTING = '[Test] Testing',
}

// Init

export const Init = createAction(Types.INIT);

export const TestClick = createAction(
  Types.TESTING,
  props<{word: string}>()
);

export const InitAuthorized = createAction(
  Types.INIT_AUTHORIZED,
  props<{uid; user}>()
);

export const InitUnauthorized = createAction(
  Types.INIT_UNAUTHORIZED
);

export const InitError = createAction(
  Types.INIT_ERROR,
  props<{error:string}>()
);


// Sign In

export const SignInEmail = createAction(
  Types.SIGN_IN_EMAIL,
  props<{credentials: EmailPasswordCredentials}>()
);

export const SignInEmailSuccess = createAction(
  Types.SIGN_IN_EMAIL_SUCCESS,
  props<{uid, user}>()
);

export const SignInEmailError = createAction(
  Types.SIGN_IN_EMAIL_ERROR,
  props<{error:string}>()
);

// Sign Up

export const SignUpEmail = createAction(
  Types.SIGN_UP_EMAIL,
  props<{credentials: EmailPasswordCredentials}>()
);

export const SignUpEmailSuccess = createAction(
  Types.SIGN_UP_EMAIL_SUCCESS,
  props<{uid: string}>()
);

export const SignUpEmailError = createAction(
  Types.SIGN_UP_EMAIL_ERROR,
  props<{error:string}>()
);

// Sign Out


export const SignOut = createAction(
  Types.SIGN_OUT
);

export const SignOutSuccess = createAction(
  Types.SIGN_OUT_SUCCESS
);

export const SignOutError = createAction(
  Types.SIGN_OUT_ERROR,
  props<{error:string}>()
);

