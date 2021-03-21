import { Component } from '@angular/core';
import { Ilist } from '../../interfaces/lists';
import { ListService } from '../../services/lists.service';


@Component({
    selector: 'list-creator',
    templateUrl: './list-creator.component.html'
})

export class ListCreatorComponent {
    public list: Ilist = { title: '' };

    constructor(private listS: ListService) {}

    save() {
        console.log("add")
        this.listS.add(this.list).then((result) => {
            console.log(result)
            this.list.title = '';
        });
    }
}