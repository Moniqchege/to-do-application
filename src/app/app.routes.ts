import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { TaskCreationComponent } from "./task-creation/task-creation.component";
import { TaskListComponent } from "./task-list/task-list.component";

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
          path: 'task-creation', // Create Task (no taskId)
          component: TaskCreationComponent
        },
        {
          path: 'task-list',
          component: TaskListComponent
        },
        {
          path: 'task-lists/:taskListId/create-task', // Create Task for a specific taskListId
          component: TaskCreationComponent
        },
        {
          path: 'task-lists/:taskListId/edit-task/:id', // Edit Task for a specific taskListId and taskId
          component: TaskCreationComponent
        }
      ]
    }
  ];
  