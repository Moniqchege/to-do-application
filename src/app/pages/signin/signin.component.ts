import { HttpClient } from '@angular/common/http';
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
    "EmailId": "",
    "password": ""
  };

  http = inject(HttpClient);
  router = inject(Router);

  onLogin(){
    debugger;
    this.http.post("https://freeapi.miniprojectideas.com/api/User/Login",this.loginObj).subscribe((res:any)=>{
      if(res.result){
        alert("Login Successful");
        this.router.navigateByUrl('task-creation')
      } else {
        alert(res.message)
      }
    })
  }
}
