import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject, Observable, zip } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromDictionaries from '@app/store/dictionaries';
import * as fromUser from '@app/store/user';
import * as fromForm from '../../store/form';


import { StepperService } from './components/stepper/services';
import { PersonalForm } from './components/personal/personal.component';
import { ProfessionalForm } from './components/professional/professional.component';
// import { ProfessionalForm } from './components/professional/professional.component';
import { MapperService } from './services';

export interface ProfileForm {
    personal: PersonalForm;
    professional: ProfessionalForm;
}
@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {

    dictionaries$: Observable<fromDictionaries.Dictionaries>;
    dictionariesIsReady$: Observable<boolean>;

    personal$: Observable<PersonalForm>;
    professional$: Observable<ProfessionalForm>;

    loading$: Observable<boolean>;

    private profile$: Observable<ProfileForm>;
    private user: fromUser.User;

    private isEditing: boolean;
    private destroy = new Subject<any>();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<fromRoot.State>,
        public stepper: StepperService,
        private mapper: MapperService
    ) { }

    ngOnInit(): void {

        this.user = this.route.snapshot.data.user;
        this.isEditing = !!this.user;

        this.profile$ = this.store.pipe(select(fromForm.getFormState));
        this.personal$ = this.store.pipe(select(fromForm.getPersonalForm));
        this.professional$ = this.store.pipe(select(fromForm.getProfessionalForm));

        // this.store.pipe(
        //     select(fromDictionaries.getDictionaries)
        // ).subscribe((vl) => this.dictionaries$ = vl)

        // this.store.pipe(
        //     select(fromDictionaries.getIsReady)
        // ).subscribe((vl) => console.log('11111111111',vl))

        this.dictionaries$ = this.store.pipe(select(fromDictionaries.getDictionaries));
        this.dictionaries$ = this.store.select(fromDictionaries.getDictionaries)
        this.dictionariesIsReady$ = this.store.pipe(select(fromDictionaries.getIsReady));


        this.loading$ = this.store.pipe(select(fromUser.getLoading));

        if (this.user) {
            const form = this.mapper.userToForm(this.user);
            this.store.dispatch(fromForm.Set({form}));
        }

        this.stepper.init([
            { key: 'personal', label: 'Personal' },
            { key: 'professional', label: 'Professional' }
        ]);

        this.stepper.complete$.pipe(
            switchMap(() => zip(this.profile$, this.dictionaries$)),
            takeUntil(this.destroy)
        ).subscribe(([profile,dictionaries]) => {
            this.onComplete(profile, this.user, dictionaries);
            console.log('completed');

        });

        this.stepper.cancel.pipe(takeUntil(this.destroy)).subscribe(()=> {
            console.log('canceled');
        })



    }

    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
        this.store.dispatch(fromForm.Clear());
    }

    get title(): string {
        return this.isEditing ? 'Edit Profile' : 'New Profile';
    }

    onChangedPersonal(data: any): void {
        this.store.dispatch(fromForm.Update({ changes:{personal:data} }));
    }

    onChangedProfessional(data: any): void {
        this.store.dispatch(fromForm.Update({ changes:{professional:data} }));
    }

    private onComplete(profile: ProfileForm, user: fromUser.User, dictionaries: fromDictionaries.Dictionaries): void {
        if (this.isEditing) {

            const request = this.mapper.formToUserUpdate(profile, user, dictionaries);
            this.store.dispatch(fromUser.Update( {user:request} ));

        } else {

            const request = this.mapper.formToUserCreate(profile, dictionaries);
            this.store.dispatch(fromUser.Create({user:request}));

        }
    }

}


