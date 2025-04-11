import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { LayoutComponent } from './layout/layout.component';
import { TaskCreationComponent } from './task-creation/task-creation.component';
import { TaskListComponent } from './task-list/task-list.component';

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
        path: 'signup', 
        component: SignupComponent
    },
    { 
        path: '', 
        component: LayoutComponent,
        children: [
            
            {
                path: 'task-creation',
                component: TaskCreationComponent
            },
            {
                path: 'task-list',
                component: TaskListComponent
            },
            {
                path: 'create',
                component: TaskCreationComponent
            },
            {
                path: 'edit',
                component: TaskCreationComponent
            },
        ]
    }
];
