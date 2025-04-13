import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ FormsModule, CommonModule ],
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

    localStorage.setItem('user', JSON.stringify({
      firstName: this.signupObj.firstName,
      lastName: this.signupObj.lastName,
      email: this.signupObj.EmailId,
      password: this.signupObj.password
    }));

    this.router.navigateByUrl('signin'); 
  }

  goToSignin() {
    this.router.navigate(['/signin'])
  }

  togglePassword(){
    this.showPassword = !this.showPassword
  }

  toggleConfirmPassword(){
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
