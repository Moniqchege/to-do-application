import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'signup',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupObj: any = {
    "FirstName": "",
    "LastName":"",
    "EmailId": "",
    "password": "",
    "ConfirmPassword":"",
  };

  http = inject(HttpClient);
  router = inject(Router);

  onSignup(){
    debugger;
    this.http.post("https://freeapi.miniprojectideas.com/api/User/CreateNewUser",this.signupObj).subscribe((res:any)=>{
      if(res.result){
        alert("Signup Successful");
        this.router.navigateByUrl('signin')
      } else {
        alert(res.message)
      }
    })
  }

}
