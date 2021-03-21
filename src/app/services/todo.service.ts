import { Injectable } from "@angular/core";
import { AngularFirestoreCollection, AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { ITodo } from '../interfaces/todo';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class TodoService {
    private collection: AngularFirestoreCollection<ITodo>;
    private listId: string;
    private ref: Observable<DocumentChangeAction<any>[]>;

    constructor( private afs: AngularFirestore ) {}

    setCollection(listId: string){
        this.listId = listId;
        this.collection = this.afs.collection('list')
            .doc(listId)
            .collection('todos', (ref) => {
                return ref.where('status', '==', 0);
            });

        this.ref = this.collection.snapshotChanges();
    }

    getFromList(listId: string): Observable<ITodo> {
        if(!this.collection || this.listId != listId) this.setCollection(listId);

        let ob$:Observable<any> = this.ref.pipe(map(actions => actions));

        return ob$.pipe(map(item => {
            const data = item.payload.doc.data() as ITodo;
            const id = item.payload.doc.id;
            return { ...data, id };
        }));
    }

    add(listId: string, todo: ITodo) {
        if(!this.collection || this.listId != listId) this.setCollection(listId);

        const createdAt = firebase.firestore.FieldValue.serverTimestamp();

        todo.createdAt = createdAt;

        return this.collection.add(todo);
    }

    update(listId: string, todo: ITodo): Promise<void> {
        if(!this.collection || this.listId != listId) this.setCollection(listId);

        return this.collection.doc(todo.id).update({ status: todo.status });
    }
}