import { User } from './../../models/backend/user/index';
import { Injectable } from '@angular/core';
import {  Actions, ofType, createEffect } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';


import { Observable, from, of } from 'rxjs';
import { map, switchMap, catchError, take, tap, withLatestFrom } from 'rxjs/operators';

import { environment } from '@src/environments/environment';


import * as fromActions from './user.actions';

import { NotificationService } from '@app/services';

@Injectable()


export class UserEffects{

  constructor(
    private actions: Actions,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private notification: NotificationService
) { }

init = createEffect(() => this.actions.pipe(
  ofType(fromActions.Types.INIT),
  switchMap(() => this.afAuth.authState.pipe(take(1))),
  switchMap(authState => {
    if (authState) {

        return this.afs.doc<User>(`users/${authState.uid}`).valueChanges().pipe(
            take(1),
            // map(user => fromActions.InitAuthorized(authState.uid, user || null)),
            map(user => ({type: fromActions.Types.INIT_AUTHORIZED, payload: authState?.uid , user})),
            catchError(err => of(fromActions.InitError(err.message)))
        );

    } else {
        return of(fromActions.InitUnauthorized());
    }

  })
));

signInEmail = createEffect(() => this.actions.pipe(
  ofType(fromActions.Types.SIGN_IN_EMAIL),
  map((action: any) => action.credentials),
  switchMap(credentials =>
    from(this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)).pipe(
        switchMap(signInState =>
          this.afs.doc<User>(`users/${signInState?.user?.uid}`).valueChanges().pipe(
              take(1),
              tap(() => {
                  this.router.navigate(['/']);
              }),
              // map(user => fromActions.SignInEmailSuccess({signInState.user.uid , user}))
              map(user => ({type: fromActions.Types.SIGN_IN_EMAIL_SUCCESS, payload: signInState?.user?.uid , user}))
          )


        ),
        catchError(err => {
            this.notification.error(err.message);
            return of(fromActions.SignUpEmailError(err.message));
        })
    )
  )
))

signUpEmail = createEffect(() => this.actions.pipe(
  ofType(fromActions.Types.SIGN_UP_EMAIL),
  map((action: any) => action.credentials),
  switchMap(credentials =>
    from(this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)).pipe(
        tap(() => {
            this.afAuth.currentUser.then(u => u?.sendEmailVerification(environment.firebase.actionCodeSettings))
            .then(() => {

              this.router.navigate(['/auth/email-confirm']);
            })
        }),
        map((signUpState: any) => fromActions.SignUpEmailSuccess(signUpState?.user?.uid )),
        catchError(err => {
            this.notification.error(err.message);
            return of(fromActions.SignUpEmailError(err.message));
        })
    )
  )
))


signOut = createEffect(() => this.actions.pipe(
  ofType(fromActions.Types.SIGN_OUT),
        switchMap(() =>
            from(this.afAuth.signOut()).pipe(
                map(() =>  fromActions.SignOutSuccess()),
                catchError(err => of( fromActions.SignOutError(err.message)))
            )
        )
))



}



