import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { TaskCreationComponent } from './task-creation/task-creation.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'signin', component: SigninComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'task-creation', component: TaskCreationComponent},

];
