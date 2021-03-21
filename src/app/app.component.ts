import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public afAuth: AngularFireAuth, private router: Router) {

  }

  logout() {
    this.afAuth.signOut().then(() => {
      console.log("Logout")
      this.router.navigate(["/login"]);
    })
  }
}
