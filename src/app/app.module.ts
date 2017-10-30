import { BrowserModule } from '@angular/platform-browser';
import { NgModule , LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule , MatCheckboxModule, MatCardModule, MatGridListModule,
  MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule,
  MatListModule , MatTabsModule, MatSelectModule} from '@angular/material';
import { AuthService } from './services/auth-service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { EnregistrementComponent} from './enregistrement/enregistrement.component';
import { EnrPersonnelsComponent, MyTelInput  } from './enregistrement/enr-personnels/enr-personnels.component';
import { EnrPermissionsComponent } from './enregistrement/enr-permissions/enr-permissions.component';
import { EnrPersonnelsConjComponent, MyTelInputConj } from './enregistrement/enr-personnels-conj/enr-personnels-conj.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { FactureComponent } from './enregistrement/facture/facture.component';
import { FormFieldDateComponent } from './enregistrement/form/form-field-date/form-field-date.component';
import { MAT_DATE_FORMATS , DateAdapter} from '@angular/material';
import { MY_DATE_FORMATS } from './services/MY_DATE_FORMATS';
import { MyDateAdapter } from './services/MyDateAdapter';
import { DateNaissanceValidationDirective } from './enregistrement/directiveValidation/date-naissance-validation.directive';
import { ErrorsComponent } from './enregistrement/errors/errors.component'
import { PaymentModule } from './payments/payment/payment.module';
import { MakePaymentComponent } from './payments/make-payment/make-payment.component';
import { PaymentService } from './payments/payment/payment.service';
import { SendEmailComponent } from './send-email/send-email.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EnregistrementComponent,
    EnrPersonnelsComponent,
    EnrPermissionsComponent,
    EnrPersonnelsConjComponent,
    MyTelInput,
    MyTelInputConj,
    FactureComponent,
    FormFieldDateComponent,
    DateNaissanceValidationDirective,
    ErrorsComponent,
    MakePaymentComponent,
    SendEmailComponent

  ],
  imports: [

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    FormsModule,
    HttpModule,
    BrowserModule, BrowserAnimationsModule, NoopAnimationsModule, MatButtonModule, MatCheckboxModule, MatCardModule, MatGridListModule,
    MatListModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule, MatListModule, MatSelectModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-CA' },
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, PaymentService
    ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
