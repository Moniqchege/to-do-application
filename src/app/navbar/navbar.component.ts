import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router, private authService: AuthService) {}

  handleNavigation(path:string):void{
    const currentRoute = this.router.url;
    const isAuthPage = ['/signin', '/signup'].some(route => currentRoute.startsWith(route));

    if (isAuthPage && !this.authService.isUserLoggedIn()){
      alert('Please Login')
    } else {
      this.router.navigate([path]);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
