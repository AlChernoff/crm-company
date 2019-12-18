import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private as: AuthService,
    private fms: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.as.getAuth().subscribe(auth => {
      if (auth) this.router.navigate(['/']);
    });
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {

    if (valid) {

      this.as.login(value.email, value.password)
        .then(
          res => {
            this.fms.show('You are now logged in!', {
              cssClass: 'fixed-top m-auto bg-success w-50 text-white text-center', timeout: 3000
            });
            this.router.navigate(['/']);
          }
        ).catch(err => {
          this.fms.show(err.message, {
            cssClass: 'fixed-top m-auto bg-danger w-50 text-white text-center', timeout: 3000
          });
        });
    }
  }

}
