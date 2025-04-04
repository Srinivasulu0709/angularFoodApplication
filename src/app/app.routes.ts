import { Routes } from '@angular/router';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthguardService } from './service/auth/authguard.service';

export const routes: Routes = [ 
    {path:'',component:HomepageComponent},
    {path:'register',component:RegistrationComponent},
    {path:'login', component:LoginComponent},
    {path:'home',component:HomepageComponent,canActivate:[AuthguardService]},
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
