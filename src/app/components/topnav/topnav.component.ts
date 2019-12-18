import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  @Input()
  isLoggedin: boolean;

  @Input()
  userEmail: string;

  constructor(
    private as: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoggedOut(event) {
    event.preventDefault();
    this.isLoggedin = false;
    this.as.logout();
    window.location.reload();
    // not good: "Missing or insufficient permissions." error
    // this.router.navigate(['/login']);
  }

}
