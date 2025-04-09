import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { TaskCreationComponent } from './pages/task-creation/task-creation.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'signin', 
        pathMatch: 'full' 
    },
    { 
        path: 'signin', 
        component: SigninComponent
    },
    { 
        path: '', 
        component: HomeComponent,
        children: [
            {
                path: 'task-creation',
                component: TaskCreationComponent
            },
            { 
                path: 'signup', 
                component: SignupComponent
            },
            { 
                path: 'signin', 
                component: SigninComponent
            },

        ]
    },

];
