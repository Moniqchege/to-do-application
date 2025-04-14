import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [ FormsModule ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  loginObj: any = {
    EmailId: '',
    password: ''
  };

  router = inject(Router);

  onLogin() {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert('No user found, please sign up first.');
      return;
    }

    const user = JSON.parse(storedUser);
    console.log('Stored user:', user);
    console.log('Login input:', this.loginObj);

    if (this.loginObj.EmailId === user.email && this.loginObj.password === user.password) {
      const taskListId = user.taskListId || 'default-task-list-id';  // Replace with dynamic fetch from backend if needed

      localStorage.setItem('taskListId', taskListId);
      
      this.router.navigate(['/task-creation']);
    } else {
      alert('Invalid email or password');
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
