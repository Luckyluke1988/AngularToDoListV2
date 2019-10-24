import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Todo} from '../../_interface/todo';
import { EventPing } from 'src/app/_interface/eventping';
import {DataService} from '../../_service/data.service';
import { Subscriber } from 'rxjs';


@Component({
  selector: 'app-template-todo',
  templateUrl: './template-todo.component.html',
  styleUrls: ['./template-todo.component.sass']
  
})
export class TemplateTodoComponent implements OnInit {

  @Input() Todo: Todo;
  @Output() ping: EventEmitter<any> = new EventEmitter<any>();

  constructor(public _dataService: DataService) 
  {
    
  }

  ngOnInit() 
  {

  }

  public changeCheck(event?: any): void
  {
    this.Todo.status = !this.Todo.status;
    this._dataService.puttodo(this.Todo).subscribe((data: Todo) => 
    {
    const eventObject: EventPing = 
    {
        label: 'check',
        object: this.Todo
    };
    this.ping.emit(eventObject)

  }, error => 
    {
      console.log(error)
    });
  }


  public changeLabel(event?: any): void{
    this._dataService.puttodo(this.Todo).subscribe((data: Todo) => {
    const eventObject: EventPing = {
        label: 'label',
        object: this.Todo
    };
    this.ping.emit(eventObject)
  }, error => 
  {
    console.log(error)
  });
}

  public deleteTodo(event?: any): void
  {
    this._dataService.deletetodo(this.Todo).subscribe((data: Todo) => 
    {

    const eventObject: EventPing = 
    {
        label: 'delete',
        object: this.Todo
    };
    this.ping.emit(eventObject)

  }, error => 
    {
      console.log(error)
    });
  }


}
