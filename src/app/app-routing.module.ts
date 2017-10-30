import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard';
import { EnregistrementComponent } from './enregistrement/enregistrement.component';
import { SelectivePreloadingStrategy } from './services/selective-preloading-strategy';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'membre', component: AppComponent, canActivate: [AuthGuard] },





  { path: 'inscription', component: EnregistrementComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: 'membre' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,
    {
      enableTracing: true, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategy,
    }
  ) ],
  exports: [ RouterModule ],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule {}
