import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
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
    const usersData = localStorage.getItem('users');
  
    if (!usersData) {
      alert('No users found. Please sign up first.');
      return;
    }
  
    const users = JSON.parse(usersData);
    const matchingUser = users.find((u: any) =>
      u.email === this.loginObj.EmailId && u.password === this.loginObj.password
    );
  
    if (matchingUser) {
      localStorage.setItem('currentUser', JSON.stringify(matchingUser));
      localStorage.setItem('taskListId', matchingUser.taskListId);
  
      if (matchingUser.role === 'Admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/task-creation']);
      }
    } else {
      alert('Invalid email or password.');
    }
  }
  
  
  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
