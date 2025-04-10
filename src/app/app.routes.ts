import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { TaskCreationComponent } from './pages/task-creation/task-creation.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { LayoutComponent } from './layout/layout.component';

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
    },

];
