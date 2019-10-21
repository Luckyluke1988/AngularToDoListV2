import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Todo} from '../../_interface/todo';
import { EventPing } from 'src/app/_interface/eventping';


@Component({
  selector: 'app-template-todo',
  templateUrl: './template-todo.component.html',
  styleUrls: ['./template-todo.component.sass']
  
})
export class TemplateTodoComponent implements OnInit {

  @Input() Todo: Todo;
  @Output() ping: EventEmitter<any> = new EventEmitter<any>();

  constructor() 
  {

  }

  ngOnInit() 
  {

  }

  public changeCheck(event?: any): void
  {
    this.Todo.status = !this.Todo.status;
    const eventObject: EventPing = 
    {
        label: 'Check',
        object: this.Todo
    };
    this.ping.emit(eventObject)
  }

  public changeLabel(event?: any): void
  {
    const eventObject: EventPing = 
    {
        label: 'label',
        object: this.Todo
    };
    this.ping.emit(eventObject)
  }

  public deleteTodo(event?: any): void
  {
    const eventObject: EventPing = 
    {
        label: 'delete',
        object: this.Todo
    };
    this.ping.emit(eventObject)
  }
}
