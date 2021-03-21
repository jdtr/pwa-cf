import { state, trigger, style, transition, animate, query, stagger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/lists.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('enterState', [
      transition('* => *', [
        query(':enter', [
          style({ transform: 'translateX(-100%)', opacity: 0 }),
          stagger(50, [
            animate(200, style({transform: 'translateX(0)', opacity: 1}))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  constructor( public listS: ListService ) { }

  ngOnInit(): void {
  }

  urlLists(item) {
    return '/lists/' + item.id;
  }

}
