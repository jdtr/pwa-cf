import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITodo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'list',
    templateUrl: 'list.component.html'
})

export class ListComponent implements OnInit {
    public listId: string;
    public todos: Observable<ITodo>;

    trackTodoObjects = (id, obj) => obj.id;

    constructor(private route: ActivatedRoute, private todoS: TodoService) {}

    ngOnInit() {
        this.listId = this.route.snapshot.params.id;
        this.todos = this.todoS.getFromList(this.listId);
    }
}