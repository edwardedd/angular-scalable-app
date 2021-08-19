import { Component,OnInit } from '@angular/core';
import { environment } from '@src/environments/environment';
import { test } from '@app/test';
// import { AngularFirestore } from '@angular/fire/firestore';
import * as fromDictionaries from './store/dictionaries';
import * as fromRoot from './store';
import * as fromUser from './store/user';
import { Store,select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-front-back-course';

  isAuthorized$: Observable<boolean>;

  constructor(private store:Store<fromRoot.State>){

  }

  ngOnInit() {
    this.isAuthorized$ = this.store.pipe(select(fromUser.getIsAuthorized));
    console.log('---',this.isAuthorized$);

    this.store.dispatch(fromUser.Init());
    this.store.dispatch(fromDictionaries.Read());
  }

  onSignOut(): void{
    this.store.dispatch(fromUser.SignOut())
  }
}
