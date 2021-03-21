import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/users';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: AngularFirestoreCollection<IUser>;

  constructor( private afs: AngularFirestore ) { 
    this.users = this.afs.collection<IUser>('users');
  }

  add(user: IUser): Promise<void> {
    return this.users.doc(user.uid).set(user).catch(console.log);
  }
}
