import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ITodo, TStatus } from '../../../interfaces/todo';

@Component({
    selector:'creator-todo',
    templateUrl: './creator.component.html',
    animations: [
        trigger('openClose', [
            state('collapsed', style({ height: '0px'})),
            state('expanded', style({height: '*'})),
            transition('collapsed <=> expanded', [animate(300, style({height: '*'})), animate(300)])
        ])
    ]
})

export class CreatorTodoComponent implements OnInit {
    @Input() id: string;

    public formState = 'collapsed';
    public todo: ITodo = { content: '', status: TStatus.Created };

    constructor( private todoS: TodoService ) {}

    ngOnInit() {}

    label() {
        return (this.formState === 'collapsed') ? 'Add new pending' : 'Hide form';
    }

    icon() {
        return (this.formState === 'collapsed') ? 'fa-plus' : 'fa-caret-up';
    }

    toggleForm() {
        this.formState = (this.formState === 'collapsed') ? 'expanded' : 'collapsed';
    }

    save() {
        this.todoS.add(this.id, this.todo);
    }
}