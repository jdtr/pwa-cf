import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Ilist } from '../interfaces/lists';
import { AuthService } from './auth/auth.service';

import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})

export class ListService {
    public uid: string;
    public listsCollection: AngularFirestoreCollection<Ilist>;
    public lists: Observable<Ilist[]>;

    constructor ( public afs: AngularFirestore, private auth: AuthService ) {
        this.auth.getUser().subscribe(user => {
            this.uid = user.uid;

            if ( this.uid ) this.setCollection();
        });
    }

    setCollection() {
        this.listsCollection = this.afs.collection('users').doc(this.uid).collection<Ilist>('lists');

        this.lists = this.listsCollection.snapshotChanges().pipe(map(actions => {
            return actions.map(item => {
                const data = item.payload.doc.data() as Ilist;
                const id = item.payload.doc.id;

                return { ...data, id };
            });
        }));
    }

    add( list: Ilist ) {
        if ( !this.listsCollection ) throw Error('Set a colletion before trying to add a new document');

        const createdAt = firebase.firestore.FieldValue.serverTimestamp();

        list.createdAt = createdAt;

        return this.listsCollection.add(list);
    }
}