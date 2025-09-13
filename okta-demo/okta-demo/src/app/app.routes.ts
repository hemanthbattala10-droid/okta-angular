
 import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { ProfileComponent } from './profile.component';
import { AuthGuard } from './auth.guard';
import { OktaCallbackComponent } from '@okta/okta-angular'; // ✅ Import this

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login/callback', component: OktaCallbackComponent }, // ✅ Add this
  { path: '', redirectTo: '/profile', pathMatch: 'full' }
];

