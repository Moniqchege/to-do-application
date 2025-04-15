import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupObj: any = {
    firstName: '',
    lastName: '',
    EmailId: '',
    password: '',
    confirmPassword: ''
  };

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  router = inject(Router);

  onSignup() {
    if (this.signupObj.password !== this.signupObj.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const adminEmail = 'admin1@gmail.com';
    const adminPassword = 'PassworD';

    const fakeTaskListId = this.generateUUID(); // Task list ID
    const fakeUserId = this.generateUUID();     // New user ID

    const userRole = (
      this.signupObj.EmailId === adminEmail && 
      this.signupObj.password === adminPassword) ? 'Admin' : 'User';

    const newUser = {
      userId: fakeUserId,
      firstName: this.signupObj.firstName,
      lastName: this.signupObj.lastName,
      email: this.signupObj.EmailId,
      password: this.signupObj.password,
      role: userRole,
      taskListId: fakeTaskListId   // ✅ Use lowercase for consistency
    };

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Signup successful');
    this.router.navigateByUrl('signin');
  }

  goToSignin() {
    this.router.navigate(['/signin']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
