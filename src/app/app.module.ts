import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HeaderComponent } from './components/header/header.component';
import { MatDateFormats, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NotificationModule, NotificationService } from './services';



// Store

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
const StoreDevtools = !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [];
import { reducers, effects } from './store';

const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
      dateInput: { day: 'numeric', month: 'numeric', year: 'numeric' },
  },
  display: {
      dateInput: { day: 'numeric', month: 'short', year: 'numeric' },
      monthYearLabel: { year: 'numeric', month: 'short' },
      dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
      monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase.config),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    MatNativeDateModule,
    NotificationModule.forRoot(),
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtools
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
      { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
      { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
