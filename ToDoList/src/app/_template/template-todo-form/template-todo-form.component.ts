import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Todo} from '../../_interface/todo';
import { EventPing } from 'src/app/_interface/eventping';

@Component({
  selector: 'app-template-todo-form',
  templateUrl: './template-todo-form.component.html',
  styleUrls: ['./template-todo-form.component.sass']
})
export class TemplateTodoFormComponent implements OnInit {


  public Todo: Todo;
  @Output() ping: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor() 
  {
    this.Todo=
    {
      id: undefined,
      label: undefined,
      status: false,
      position: undefined
    }
  }


  ngOnInit() {}

///Test
  public createTodo(event: any): void
  {
    this.ping.emit(this.Todo);
    this.Todo=
    {
      id: undefined,
      label: undefined,
      status: false,
      position: undefined
    }
    
  }

}
