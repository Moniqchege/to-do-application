import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, FormsModule, RouterOutlet],
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

  router = inject(Router);

  onSignup() {
    if (this.signupObj.password !== this.signupObj.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem('user', JSON.stringify({
      firstName: this.signupObj.firstName,
      lastName: this.signupObj.lastName,
      email: this.signupObj.email,
      password: this.signupObj.password
    }));

    alert("Signup Successful");
    this.router.navigateByUrl('signin'); 
  }

  goToSignin() {
    this.router.navigate(['/signin'])
  }
}
