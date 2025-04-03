import { Routes } from '@angular/router';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { LoginComponent } from './authentication/login/login.component';

export const routes: Routes = [ 
    {path:'',component:RegistrationComponent},
    {path:'register',component:RegistrationComponent},
    {path:'login', component:LoginComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
