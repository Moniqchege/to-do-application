import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, FormsModule, RouterOutlet],
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

    if (this.loginObj.EmailId === user.email && this.loginObj.password === user.password) {
      alert('Login Successful');
      this.router.navigateByUrl('task-creation'); 
    } else {
      alert('Invalid email or password');
    }
  }
}
