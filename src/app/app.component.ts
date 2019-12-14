import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  isloggedIn: boolean = false;
  userEmail: string;

  constructor(

    private authServcei: AuthService
  ){}

    ngOnInit(){
      this.authServcei.getAuth().subscribe( auth => {
        if(auth){
          this.isloggedIn = true;
          this.userEmail = auth.email;
        }
      })
    }
}
