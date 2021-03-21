import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

// import { AngularFireAuth } from 'angularfire2/auth';
// import firebase from 'firebase';

import { Observable, of } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';

import { IUser } from '../../interfaces/users';
import { UsersService } from '../users.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth, private users: UsersService) { }

  getUser(): Observable<IUser> {
    return this.afAuth.authState.pipe(
      take(1),
      filter(user => !!user),
      map((user: firebase.User) => user as IUser))
  }

  login(): Promise<void> {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(result => {
      return this.users.add({ uid: result.user.uid, email: result.user.email });
    })
    .catch(console.log);
  }
}
