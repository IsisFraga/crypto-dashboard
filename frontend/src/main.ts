import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { withPreloading, PreloadAllModules } from '@angular/router';
import { AuthGuard, LoginGuard } from './app/core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () => import('./app/features/auth/pages/login/login.component')
      .then(c => c.LoginComponent),
    canActivate: [LoginGuard]
  },
  {
    path: 'crypto',
    loadComponent: () => import('./app/features/crypto/pages/crypto-dashboard/crypto-dashboard.component')
      .then(c => c.CryptoDashboardComponent),
    title: 'Crypto Dashboard',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, 
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideAnimationsAsync()
  ]
}).catch(err => console.error(err));
