import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe(console.log)
  }

  login () {
    this.auth.login().then(() => {
      this.router.navigate(['/']);
    });
  }
}
