import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider,
} from 'angular-6-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private socialAuthService: AuthService ) {}
  
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }     
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        //Se guarda el token obtenido en localstorage.
        localStorage.setItem('user', JSON.stringify(userData));
        console.log(socialPlatform+" sign in data : " , userData);
        location.href = 'http://localhost:4200/perfilGoogle';
            
      }
    );
  }
  ngOnInit() {
    if (localStorage.getItem('errorLogin')){
      alert(localStorage.getItem('errorLogin'));
    }
  }
}
