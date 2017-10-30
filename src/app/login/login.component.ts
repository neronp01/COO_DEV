import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Observable } from 'rxjs/Observable';
import { Router,
  NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ AuthService ],
})
export class LoginComponent implements OnInit {


  constructor( public  se: AuthService, public router: Router ) { }

  ngOnInit() {

  }
  googleLogin() {
      this.se.googleLogin().then((data) => {
        this.router.navigate(['/inscription'])});
  //  return this.se.googleLogin();
  }
  facebookLogin() {
    return this.se.facebookLogin();
  }
  twitterLogin() {

    return this.se.twitterLogin().then((data) => {
      this.router.navigate(['/inscription'])});
  }
  logout() {
    return  this.se.logout();
  }
  getAuth(){
    console.log(this.se.currentUserId);
  }
test(){
    console.log(this.se.isLoggedIn);
}
}

