import { User, Employee, Recruiter } from '@app/models/backend/user';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromActions from './user.actions';

export interface State {
    entity: User;
    uid: string ;
    loading: boolean;
    error: string;
}

const initialState: State = {
    entity: null,
    uid: null,
    loading: null,
    error: null
};

export interface testState {
  word: string
}

const initialTestState: testState = {
  word: null
}

const userReducer = createReducer(
  initialState,
  on(fromActions.Init, (state) => ({
    ...state,
    loading: false
  })),
  on(fromActions.InitAuthorized, (state, action) =>({
    ...state,
    entity: action.user,
    uid: action.uid,
    loading: false,
    error: null
  })),
  on(fromActions.InitUnauthorized, (state) =>({
    ...state,
    entity: null,
    loading: false,
    error: null
  })),
  on(fromActions.InitError, (state, action) => ({
    ...state,
    entity: null,
    loading: null,
    error: action.error
  })),
  //sign in
  on(fromActions.SignInEmail, (state) =>({
    ...state,
    loading: true,
    error: null
  })),
  on(fromActions.SignInEmailSuccess, (state, action) =>({
    ...state,
    entity: action.user,
    uid: action.uid,
    loading: false,
    error: null
  })),
  on(fromActions.SignInEmailError, (state, action) => ({
    ...state,
    entity: null,
    loading: null,
    error: action.error
  })),
  // Sign Up
  on(fromActions.SignUpEmail, state => ({
    ...state,
    loading: true
  })),
  on(fromActions.SignUpEmailSuccess, (state,  uid ) => ({
    ...state,
    uid: uid.uid,
    loading: false,
    error: null
  })),
  on(fromActions.SignUpEmailError, (state, action) => ({
    ...state,
    loading: true,
    error: action.error
  })),
  // Sign Out
  on(fromActions.SignOut, state => ({
    ...state,
    loading: true
  })),
  on(fromActions.SignOutSuccess, (state) => ({
    ...initialState
  })),
  on(fromActions.SignOutError, (state, action) => ({
    ...state,
    loading: true,
    error: action.error
  })),

  on(fromActions.TestClick, (initialTestState, word) => ({
    ...initialTestState,
    word: word
  }))

)

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state,action)
}




